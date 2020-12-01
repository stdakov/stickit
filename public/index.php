<?php


require_once "../vendor/autoload.php";



//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

function error_handler($errno, $errstr, $errfile, $errline)
{
    if (($errno & error_reporting()) > 0)
        throw new ErrorException($errstr, 500, $errno, $errfile, $errline);
    else
        return false;
}
set_error_handler('error_handler');

function dd($a)
{
    echo "<pre>";
    var_dump($a);
    die();
}

require "home.php";
