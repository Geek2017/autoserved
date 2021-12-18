<?php
$client = new http\Client;
$request = new http\Client\Request;
$request->setRequestUrl('https://api.semaphore.co/api/v4/messages?apikey=86f2627fb974d84b9f91898ea8cea6c1&number=639954782764&message=whats up&sendername=AutoServed');
$request->setRequestMethod('POST');
$request->setOptions(array());
$request->setHeaders(array(
  'Cookie' => 'XSRF-TOKEN=eyJpdiI6InpBOWNYelhVa21LUUQ0b1I0R011dkE9PSIsInZhbHVlIjoibWdGeTFGSnc1SE1qNExJSzJSZ08rNkJBZVpscjRuajhlZjJTaGpxZUl1VW92MTBlR042R1Yrb1VpZTBwOFQ4ZHFLRWlGMHU5S2tcLytBNW40MnNWTW9nPT0iLCJtYWMiOiI1Y2QyMTViMzM4OGEwM2U3Njg3YjBiZGFkYTg4NjQ5ODk1NDc3YjUxYmZlZGM1MzkxYjliY2MwZDc3OTI4MzBiIn0%3D; laravel_session=eyJpdiI6InJocll5eHRURCtBTENCNGpnN1RNWWc9PSIsInZhbHVlIjoiTUFtT0FKbmljVzg0NTVWVnoyeXdXRHV2WStOQ08zenFLWFV4S0ZEXC91dWtCcm5LczdDTHFzMEREYmFTdnNuR0VvT0ZJNDdHcUhJYUM5cGF0RHB2cHdRPT0iLCJtYWMiOiI0M2I2MGI5ODU5ZmM5Y2MzOGE5YTQ1M2NkMWFiZWQxZGMxNWExMDk2OWZiNTVmODQ3MTM3ZWJhMjhmNmNmOGFlIn0%3D'
));
$client->enqueue($request)->send();
$response = $client->getResponse();
echo $response->getBody();
