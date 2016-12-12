<?php

$ch = curl_init('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$json = curl_exec($ch);
curl_close($ch);

$arr = json_decode($json, true);
echo 'http://www.bing.com/'. $arr['images'][0]['url'];