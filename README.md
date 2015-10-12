# Node.js HTTP USB PPLA/PPLB Print server

This project aims to create a simple way to use your USB barcode printer via HTTP, and it was altered by me to become compatible with my ppla-builder component.

This code depends on usblp linux kernel driver to provide /dev/usb/<printerName> interface (default printer name is lp0 if none is provided).

It was tested with an Argox PPLA USB printer.

Usage is simple:

    node http-ppla.js <authToken> [printerName]

The server will listen on port 8080.

HTTP Requests must be in this format:

    { auth_token: 'authTokenExpectedByServer',          // the authToken configured in the server
      contentToPrint: 'contentToPrint' }                // the content to print, correctly formated in ppla programming language (the ppla-builder component just makes it easier to write it)
