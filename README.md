##Document Verification using Sawtooth

	 	 	 	
# Getting started

`git clone https://gitlab.com/abhiramts007/docver-chd-group-project`
Or
`git clone https://github.com/AbhiramTS/chdProject`


`sudo docker-compose up`

The application should be available at `http://localhost:4200`

---------------------------------------------------------
# DOCVER

Simple document verification example of a Sawtooth application.

## Introduction

This is a minimal example of a Sawtooth application, with a javascript based transaction processor and angular based client. This example demonstrates a simple use case, where officials can register for birth/death, and generate a certificate which can then be reverified at any point of time in the feature.

1. Register for birth/death certificate
2. Generate the certificate
3. Reverify the certificate at any point of time
4. Search the certificate at any point of time

All transactions have the same 6 hex digit prefix, which is the first 6 hex characters of the SHA-512 hash of "docver" (that is, "2690bc").
The docver is identified by with a corresponding public/private keypair.
The transaction id of corresponding doccument is 70 hex digit address derived from:
* a 6-hex character prefix (the "docver" Transaction Family namespace) and
* a 58 bit hex characters of the SHA-512 that is calculated based on user data and
* a 6 bit based on type of certificate

## Components
The project contains two parts :


	I)Client Application ,written in Angular
	II)Transaction Processor ,written in JavaScript

1. The client application consist of:

* `angular application` : contains the client application that can make transactions to the validator through REST API


The client container is built with Dockerfile.

2. The Transaction Processor in javascript.

TransactionProcessor is a generic class for communicating with a validator and routing transaction processing requests to a registered handler.
index.js has the Transaction Processor class.

The handler class is application-dependent and contains the business logic for a particular family of transactions.
DocVerHandler.js has the handler class.

The javascript transaction processor has the following files :

a)index.js (transaction processor class)
b)package.json
c)Dockerfile
d)DocVerHandler.js (handler class)


## Docker Usage
### Prerequisites
This example uses docker-compose and Docker containers. If you do not have these installed please follow the instructions here: https://docs.docker.com/install/

**NOTE**

Any Linux distributions which support Docker should work.

### Building Docker containers

Before starting the project make sure the Docker service is up and running.

To start up the environment, perform the following tasks:

a)Open a terminal window.
b)Change your working directory to the same directory where you saved the Docker Compose file.
c)Run the following command:


	$sudo docker-compose up --build

	The `docker-compose.yml` file creates a genesis block, which contain initial Sawtooth settings, generates Sawtooth, and starts the Validator, Settings TP, docVer TP, and REST API.


To stop the validator and destroy the containers, type `^c` in the docker-compose window, wait for it to stop, then type

	$sudo docker-compose down




