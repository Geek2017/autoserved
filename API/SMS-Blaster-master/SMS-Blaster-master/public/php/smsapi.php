<?php

$curl = curl_init();

$result = $_GET['data'];

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.plivo.com/v1/Account/MAZWE1ZJHLMZK2MWUXMJ/Message/',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => array('src' => '18027554001','dst' => $result,'text' => 'Test2'),
  CURLOPT_HTTPHEADER => array(
    'Accept: Access-Control-Allow-Origin',
    'Authorization: Basic TUFaV0UxWkpITE1aSzJNV1VYTUo6TmpSaU5tRTBaVEk1TldNeFpUVmpPRE0yWmpJMU5HTTFaamt4WXpZMQ=='
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo ($response)
?>