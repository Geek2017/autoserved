from joblib import dump
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import category_encoders as ce
from skmultilearn.ext import download_meka, Meka
from sklearn.preprocessing import MultiLabelBinarizer
from skmultilearn.model_selection import iterative_train_test_split
import numpy as np
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

# Load and process data
print("Loading data....")
df = pd.read_excel('./dataset.xlsx', index_col='Primary Key')
df = df[ (df['Service Category'] != 'Batteries') ]
df2 = df[['Mileage In', 'Make', 'Model', 'Year', 'Service Category']]
df3 = df2.groupby(['Make', 'Year','Model', 'Mileage In']).agg(list)
df3 = df3.reset_index()
df3['Service Category'] = df3['Service Category'].apply(np.unique)

mlb = MultiLabelBinarizer()

df4 = df3.join(pd.DataFrame(mlb.fit_transform(df3.pop('Service Category')),
                          columns=mlb.classes_,
                          index=df3.index))


X = df4[['Make', 'Year','Model', 'Mileage In']]

num_categories = len(df['Service Category'].value_counts())

Y = df4.iloc[:,-num_categories:]


print("Train / test split....")
X_train, Y_train, X_test, Y_test = iterative_train_test_split(X.to_numpy(), Y.to_numpy(), test_size = 0.2)

X_train = pd.DataFrame(X_train ,columns=X.columns)
X_test = pd.DataFrame(X_test, columns=X.columns)

Y_train = pd.DataFrame(Y_train, columns=Y.columns)
Y_test = pd.DataFrame(Y_test, columns=Y.columns)

X_train['Mileage In'] = X_train['Mileage In'].astype(int)
X_test['Mileage In'] = X_test['Mileage In'].astype(int)

# Encoder
print("Creating encoder....")
encoder = ce.count.CountEncoder(cols=['Make', 'Year', 'Model'])


# Set up Meka
print("Downloading meka JAR....")
meka_classpath = download_meka()

print("Setting up meka....")
meka = Meka(
        meka_classifier = os.environ['MEKA_CLASSIFIER'], # Ensembles of Classifier Chains (ECC)
#         weka_classifier = "weka.classifiers.trees.RandomForest",
        meka_classpath = meka_classpath, #obtained via download_meka
        java_command = os.environ['MEKA_JAVA_PATH'] # path to java executable
)


# Create sklearn pipeline

scaler = StandardScaler()

print("Creating pipeline....")
pipe = Pipeline([('encoder', encoder), ('scaler', scaler), ('meka', meka)])

# Fit pipeline
print("Fitting pipeline....")
pipe.fit(X_train, Y_train)


samp = ["toyota", 2005, "vios", 1555]
input_series = pd.Series(samp, index=['Make', 'Year', 'Model', 'Mileage In'])
input_to_df = input_series.values.reshape(1,4)
input_df = pd.DataFrame(input_to_df, columns=['Make', 'Year', 'Model', 'Mileage In'])

print(input_df)

print(pipe.predict(input_df))


result = pipe.predict(input_df).todense().tolist()

print(result)

# Dump artifact
print("Saving pickled model....")
dump(pipe, 'ml_classifier.joblib')