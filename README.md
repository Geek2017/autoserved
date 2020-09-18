# AutoServed System

![AutoServed Logo](public/images/autoserved-logo.png)

AutoServed System UI development guide.

## Built With

-   Laravel
-   ReactJS
-   SQL

## Getting Started

### Prerequisites

### Setup

For the very first run of the application, run the following command:

`composer install` or `compose update`

`php artisan migrate`

`php artisan passport:client --personal`

`php artisan passport:keys`

### Application Routing

#### Front-end Routes

#### API Routes

### Front-end Development

#### UI Framework

The UI framework that is currently being used came from [Shards Dashboard](https://designrevision.com/demo/shards-dashboards/index.html) - A copy of the license is available at [LICENCE.md](LICENCE.md).

This is a [React](https://reactjs.org) template.

#### Icons

The icons came from [Material Icons](https://material.io/tools/icons/?style=baseline).

### API Development

#### Requests

The input values of each API micro-services will come from different parameters depending on the request type.

##### Headers

For every API call, the following header is required:

-   `Accept` with the value of `application/json`
    -   This will ensure that the data we will be receiving from the micro-services are all in JSON format.

For every guarded API call, the following headers are required:

-   `Accept` with the value of `application/json`
-   `Authorization` with the value of `Bearer <API_TOKEN>`
    -   This will help us authenticate the users in the application.

**[Optional]** This header parameter is not required for all HTTP service calls, but useful for `POST`, `PUT` and `DELETE` APIs:

-   `Content-Type` with the value of `application/json`
    -   This will help the application understand that the parameters we are passing are all in JSON format.

##### Query Parameters

##### Path Parameters

##### Body Parameters

#### Response

##### HTTP Codes

A list of response [HTTP Codes](https://www.restapitutorial.com/httpstatuscodes.html) that are currently being used by the application.

-   **Success Codes**

    -   `200 OK` - Request is successful.
    -   `201 Created` - Request is successful and a new resource has been created.

-   **Client Error Codes**

    -   `400 Bad Request` - Request could not be understood by the server due to syntax or invalid data.
    -   `401 Unathorized` - Request will require authentication (`Authorization`) header.
    -   `403 Forbidden` - Requesting user is not allowed to access the specified resource.
    -   `404 Not Found` - The server couldn't find any matching Request-URI resource.
    -   `405 Method Not Allowed` - The method specified is not allowed for the identified resource.

-   **Server Error Codes**
    -   `500 Internal Server Error` - The server encountered an unexpected condition which prevented it from fulfilling the request.

##### Format

The following items are the standard response structure of the micro-services:

-   **Success Single Object**

```json
{
    "success": true,
    "data" : {
        ...
    }
}
```

-   **Success Multiple Objects**

```json
{
    "success": true,
    "data" : [
        {...},
        {...}
    ]
}
```

-   **Failed**

```json
{
    "success": false,
    "error": [
        // Note: This is an array of error messages
        {
            // For internal use
            // Very useful for debugging
            "code": "...",
            // For internal use
            // Very useful for writing own error messages
            "message": "...",
            // For internal use
            // Very useful for debugging
            "developerMessage": "...",
            // For external use
            // Very useful for showing error messages to the client
            "userMessage": "..."
        }
    ]
}
```

These responses are all being consumed by the front-end side.

## Testing

## Deployment

## Versioning
