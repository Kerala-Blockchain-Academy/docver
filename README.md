# Sawtooth Cookie Jar
Simple cookie jar example of a Sawtooth application.

## Introduction
This is a minimal example of a Sawtooth  application,
with a javascript based transaction processor and corresponding client.
This example demonstrates a simple  use case, where a baker bakes or eats cookies saved in a virtual cookie jar.

A baker can:
1. bake one or more cookies to add to the cookie jar
2. eat one or more cookies in the cookie jar
3. count the cookies in the cookie jar

All cookie jar transactions have the same 6 hex digit prefix, which is the first 6 hex characters of the SHA-512 hash of "cookiejar" (that is, "a4d219").
The cookie jar is identified by `mycookiejar` with a corresponding public/private keypair.
The cookie jar count is stored at an 70 hex digit address derived from:
* a 6-hex character prefix (the "cookiejar" Transaction Family namespace) and
* the first 64 hex characters of the SHA-512 hash of the "mycookiejar" public key in hex.

## Components
The cookie jar transaction family contains two parts :


	I)Client Application ,written in Python
	II)Transaction Processor ,written in JavaScript

1. The client application has two parts:

* `pyclient/cookiejar_client.py` : contains the client class which interfaces to the Sawtooth validator via the REST API.
* `pyclient/cookiejar.py` is the Cookie Jar CLI app.

The client container is built with files setup.py and Dockerfile.

2. The Transaction Processor in javascript.

   TransactionProcessor is a generic class for communicating with a validator and routing transaction processing requests to a registered
   handler. 
   index.js has the Transaction Processor class.

   
   The handler class is application-dependent and contains the business logic for a particular family of transactions. 
   CookieJarHandler.js has the handler class.

   The javascript transaction processor has the following files :
    
                a)index.js  (transaction processor class)
                b)package.json
                c)Dockerfile
		d)CookieJarHandler.js (handler class)

   Files which needs modification
                
                a)docker-compose.yaml -the name of the transaction processor needs to be specified.
                b)Dockerfile-the working directory of the tp needs to be specified.

   Files newly included
                a)package.json
                b)index.js
                c)CookieHandler.js
       
## Docker Usage
### Prerequisites
This example uses docker-compose and Docker containers. If you do not have these installed please follow the instructions here: https://docs.docker.com/install/

**NOTE**

The preferred OS environment is Ubuntu Linux 16.04.3 LTS x64.
Although other Linux distributions which support Docker should work.

### Building Docker containers

Before starting  the project make sure the Docker service is up and running.

To start up the environment, perform the following tasks:

    a)Open a terminal window.
    b)Change your working directory to the same directory where you saved the Docker Compose file.
    c)Run the following command:


	$sudo docker-compose up --build

	The `docker-compose.yaml` file creates a genesis block, which contain initial Sawtooth settings, generates Sawtooth and client keys, 
	and starts the Validator, Settings TP, Cookie Jar TP, and REST API.


### Docker client
In a separate shell from above, launch the client shell container:

	$sudo docker exec -it cookiejar-client bash

You can locate the correct Docker client container name, if desired, with
`sudo docker ps` .

In the client shell you just started above, run the cookiejar.py application.
Here are some sample commands:

cookiejar.py bake 100  # Add 100 cookies to the cookie jar
cookiejar.py eat 50    # Remove 50 cookies from the cookie jar
cookiejar.py count     # Display the number of cookies in the cookie jar


To stop the validator and destroy the containers, type `^c` in the docker-compose window, wait for it to stop, then type

	$sudo docker-compose down



## Contributing
This software is Apache 2.0 licensed and accepts contributions via
[GitHub](https://github.com/danintel/sawtooth-faq) pull requests.
Each commit must include a `Signed-off-by:` in the commit message (`git commit -s`). This sign-off means you agree the commit satisfies the [Developer Certificate of Origin (DCO).](https://developercertificate.org/)

This example software is derived from the
[Sawtooth Simplewallet](https://github.com/askmish/sawtooth-simplewallet)
application.
Simplewallet supports more programming languages and handles transactions with multiple keys.

## License
This example and Hyperledger Sawtooth software are licensed under the [Apache License Version 2.0](LICENSE) software license.

![Photo of sawtooth cookie cutters]( sawtooth-cookie-cutters.jpg "sawtooth cookie cutters")
<br /> *Antique sawtooth cookie cutters.*

© Copyright 2018, Intel Corporation.
