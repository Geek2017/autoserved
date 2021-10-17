FROM korekontrol/ubuntu-java-python3

WORKDIR '/app/'

RUN apt-get install --no-install-recommends -y build-essential gcc 

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

ENV MEKA_CLASSIFIER="meka.classifiers.multilabel.meta.BaggingML -I 10 -P 100"
ENV MEKA_JAVA_PATH=/usr/bin/java

COPY ./requirements.txt /app/

COPY ./dataset.xlsx /app/

COPY ./train.py /app/

COPY ./app.py /app/

RUN pip3 install --upgrade pip requests


RUN pip3 install -r requirements.txt

RUN pip3 install tensorflow

RUN python3 train.py

CMD ["python3", "app.py"]