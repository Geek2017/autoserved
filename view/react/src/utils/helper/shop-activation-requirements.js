export default application => {
  let result = [];

  if (application) {
    const {
      registration,
      business_permit,
      bir,
      lifters,
      merch_cert,
      special_tools,
      verified_biz_reg,
      verified_permit,
      verified_bir_cert,
      verified_lifters,
      verified_merch_cert,
      verified_special_tools
    } = application;
    result = [
      {
        title: 'SEC/DTI Certificate of Registration (25)',
        done: registration !== null && verified_biz_reg
      },
      {
        title: "Mayor's Permit (25)",
        done: business_permit !== null && verified_permit
      },
      {
        title: 'BIR Certificate of Registration (25)',
        done: bir !== null && verified_bir_cert
      },
      {
        title: 'Lifters (5)',
        done: lifters !== null && verified_lifters
      },
      {
        title: 'Merchant Certification (10)',
        done: merch_cert !== null && verified_merch_cert
      },
      {
        title: 'Special Tools (10)',
        done: special_tools !== null && verified_special_tools
      }
    ];
  }
  return result;
};
