<p align="center">
  <img height="40" src="https://github.com/psavkar/pipedream/raw/readme-test/images/twitter/TwitterLogo.png" align="center">    
  <h1 align="center"><strong>The fastest way to integrate Twitter APIs and run any code</strong></h1>
  <p align="center">Trigger code on any Twitter event or integrate any Twitter API on events from any app, HTTP request or schedule. Browse the most popular open source <a href="#top-sources">event sources</a> and <a href="#top-sources">actions</a>, <a href="#top-sources">write your own</a>, or <a href="#top-sources">contribute to the community</a>!</p>
</p>

<!-- with advanced controls to manage concurrency, delivery rates and de-duplication of events-->

## Connect Your Twitter Account
<!--## Integrate with Twitter using Pipedream-->

Connect your Twitter account to Pipedream to use any Twitter API in seconds. Pipedream manages the OAuth handshake and refresh process, and makes the following keys available on the `$auth` object in component code:


| Key     | Description                                                |
| -------- | ---------------------------------------------------------- |
| `oauth_access_token` | OAuth access token |
| `oauth_refresh_token` | OAuth refresh token (this is automatically refreshed by Pipedream) |
| `oauth_signer_url` | Endpoint to generate the `authorization` header required by Twitter |


<p align="left"><a href="http://pipedream.com"><img src="https://img.shields.io/static/v1?label=&message=Connect%20Account&color=brightgreen&style=for-the-badge" align="center"></a></p>

## Run Node.js with Twitter auth — try it now

Following is an example that demonstrates how to connect to a Twitter API using Pipedream managed auth and emit an event (this code is in [example.js](example.js) in this folder). Deploy it for free using Pipedream's UI, CLI or API.

```javascript
const twitter = require('https://github.com/PipedreamHQ/pipedream/components/twitter/twitter.app.js')
const axios = require('axios')
 
module.exports = {
  name: "Twitter Code Sample",
  description: "Code sample demonstrating how to connect to the Twitter API using Pipedream managed auth.", 
  version: "0.0.1",
  props: {
    twitter,
  }, 
  async run(event) {
    const response = await axios(this, {
      url: `https://api.twitter.com/1.1/account/verify_credentials.json`,
    }, {
      token: {
        key: this.twitter.$auth.oauth_access_token,
        secret: this.twitter.$auth.oauth_refresh_token,
      },
      oauthSignerUri: this.twitter.$auth.oauth_signer_uri,
    })
    this.$emit(response.data)
  }
}

```
<a href="http://pipedream.com"><img src="https://img.shields.io/static/v1?label=&message=Run%20on%20Pipedream&color=brightgreen&style=for-the-badge"></a>



  <!--p align="center"><a href="http://pipedream.com"><img src="https://img.shields.io/static/v1?label=&message=Run%20on%20Pipedream&color=brightgreen&style=for-the-badge" align="center"></a></p>
  <p align="center"><a href="http://pipedream.com"><img src="https://img.shields.io/static/v1?label=&message=View%20Source%20Code&color=lightgrey&style=for-the-badge" align="center"></a></p-->
</p>


*Deploy using Pipdream CLI*

```bash
pd deploy https://github.com/psavkar/pipedream/blob/readme-test/components/twitter/example.js
```

*Deploy using Pipdream API*

```bash
curl -d '{"component_url":"https://github.com/PipedreamHQ/pipedream/blob/master/components/twitter/example.js"}' \
  -H "Authorization: Bearer <API-KEY>" \
  -H "Content-Type: application/json" \
  "https://api.pipedream.com/v1/sources"
```

## Using Twitter in Components

### Prop Definitions

Add common Twitter props to your components with pre-defined labels, descriptions, default values, validation logic and more. You can over-ride any values when you include them in your own component.

 **Want to contribute a new or Twitter prop definition or suggest an edit to an existing one?** [Create a PR](https://pipedream.com) in this repo.

| Label            | Name             | Type      | Optional | Options                | Default  | Description                                                  |
| ---------------- | ---------------- | --------- | -------- | ---------------------- | -------- | ------------------------------------------------------------ |
| Search Term      | `q`              | `string`  | `false`  |                        |          | Search for keywords `star wars`, screen names `@starwars`, or hashtags `#starwars`. You can also use Twitter's [standard search operators](https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/standard-operators). |
| Keywords         | `keyword_filter` | `string`  | `true`   |                        |          | Filter tweets based on keywords `star wars`, user mentions `@starwars`, or hashtags `#starwars`. You can also use Twitter's [standard search operators](https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/standard-operators). |
| Result Type      | `result_type`    | `string`  | `true`   | Recent, Popular, Mixed | `recent` | Specifies the type of results you want to retrieve.          |
| Count (advanced) | `count`          | `integer` | `true`   |                        |          | The maximum number of tweets to return per API request (up to `100`) |
| From             | `from`           | `string`  | `false`  |                        |          | The screen name of the user (e.g., `pipedream`)              |
| Geocode          | `geocode`        | `string`  | `true`   |                        |          | Returns tweets by users located within a given radius of the given latitude/longitude. The location is preferentially taking from the Geotagging API, but will fall back to their Twitter profile. The parameter value is specified by `latitude,longitude,radius`, where radius units must be specified as either `mi` (miles) or `km` (kilometers). Note that you cannot use the near operator via the API to geocode arbitrary locations; however you can use this geocode parameter to search near geocodes directly. |
| Screen Name      | `screen_name`    | `string`  | `false`  |                        |          | The screen name of the user (e.g., `pipedream`)              |
| Location         | `trendLocation`  | `string`  | `false`  | async()                |          |                                                              |


### Methods

Use common Twitter methods in your components. Want to contribute a new or Twitter method or suggest an edit to an existing one? [Create a PR](https://pipedream.com) in this repo.

#### `async` _getAuthorizationHeader

Generate an authorization header to sign the request. The data, method and URL passed into this function must exactly match the values submitted in the API request to Twitter. This method is typically called from `_makeRequest()`.

##### Inputs

| Field    | Type     | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| `data`   | `object` | The data to post to Twitter.                                 |
| `method` | `string` | The method of the HTTP request to sign (e.g., `get`, `post`) |
| `url`    | `string` | The URL for the request.                                     |

##### Return Value

| Type     | Description                                                |
| -------- | ---------------------------------------------------------- |
| `string` | Authorization header to pass in an API request to Twitter. |

##### Code

```javascript
async _getAuthorizationHeader({ data, method, url }) {
  const requestData = {
    data,
    method,
    url,
  }
  const token = {
    key: this.$auth.oauth_access_token,
    secret: this.$auth.oauth_refresh_token,
  }
  return (await axios({
    method: 'POST',
    url: this.$auth.oauth_signer_uri,
    data: {
      requestData,
      token,
    }
  })).data
}
```

#### `async` _makeRequest

Helper function to make requests to Twitter's API. Accepts an axios configuration, generates an OAuth 1.0A signature, and returns the response from Twitter's API.

##### Inputs

| Field     | Type      | Description                                                  |
| --------- | --------- | ------------------------------------------------------------ |
| `config`  | `object`  | An object with the configuration for the axios request       |
| `attempt` | `integer` | The attempt number. Used to support retries when generating the authorization header. |

##### Return Value

| Type  | Description                          |
| ----- | ------------------------------------ |
| `any` | Returns the data from Twitter's API. |

##### Code

```javascript
async _makeRequest(config, attempt = 0) {
  if (!config.headers) config.headers = {}
  if (config.params) {
    const query = querystring.stringify(config.params)
    delete config.params
    const sep = config.url.indexOf('?') === -1 ? '?' : '&'
    config.url += `${sep}${query}`
    config.url = config.url.replace('?&','?')
  }
  let authorization, count = 0
  const maxTries = 3
  while(true) {
    try {
      authorization = await this._getAuthorizationHeader(config)
      break
    } catch (err) {
      // handle exception
      if (++count == maxTries) {
        throw err
      } 
      const milliseconds = 1000 * count
      await new Promise(resolve => setTimeout(resolve, milliseconds)) 
    }
  }
  config.headers.authorization = authorization
  return await axios(config)
},
```

## Top Sources

Event sources run on Pipedream's infrastructure and turn any API into an event stream. You can trigger Pipedream workflows, or which you can consume using Pipedream's REST API or a private, real-time SSE stream.

| Source                                            | Description                                                  | Popularity |
| ------------------------------------------------- | ------------------------------------------------------------ | ---------- |
| [Search Mentions](./sources/search-mentions)      | Emit new Tweets when a new tweet matches your search.        | 9.9        |
| [New Tweets by User](./sources/search-mentions)   | Emit new Tweets when when there is a new Tweet from a specific user. | 9.8        |
| [New Followers](./sources/search-mentions)        | Emit new Tweets when when you get a new follower.            | 7.2        |
| [My Liked Tweets](./sources/search-mentions)      | Emit new Tweets when when you get a new follower.            | 6.3        |
| [New Follower of User](./sources/search-mentions) | Emit new Tweets when when you get a new follower.            | 5.5        |

**[View All Sources (8)](./sources/search-mentions)**


## Top Actions

Actions are reusable components that implement popular operations. You can execute actions on demand or trigger and orchestrate their execution in workflows.

| Source                                            | Description                                                  | Popularity |
| ------------------------------------------------- | ------------------------------------------------------------ | ---------- |
| [Search Mentions](./sources/search-mentions)      | Emit new Tweets when a new tweet matches your search.        | 9.9        |
| [New Tweets by User](./sources/search-mentions)   | Emit new Tweets when when there is a new Tweet from a specific user. | 9.8        |
| [New Followers](./sources/search-mentions)        | Emit new Tweets when when you get a new follower.            | 7.2        |
| [My Liked Tweets](./sources/search-mentions)      | Emit new Tweets when when you get a new follower.            | 6.3        |
| [New Follower of User](./sources/search-mentions) | Emit new Tweets when when you get a new follower.            | 5.5        |

**[View All Actions (15)](./sources/search-mentions)**


## Top ` npm` Packages

| Source                              | Description                                                  | Popularity |
| ----------------------------------- | ------------------------------------------------------------ | ---------- |
| [moment](./sources/search-mentions) | A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates. | 9.8        |
| [querystring]()                     | Parse and stringify URL query strings                        | 8.7        |


## About Twitter

From breaking news and entertainment to sports and politics, from big events to everyday interests. If it's happening anywhere, it's happening on Twitter. 

### Name Slug

`twitter`

### Auth Strategy

OAuth 1.0A

<!--
| Key     | Value           |
| ------- | --------------- |
| Name Slug | `twitter` |
| Integration Type | OAuth 1.0A              |
| Popularity | 9.8        |
-->

<!--Connect your Twitter account with a click using Pipedream's browser-based OAuth flow. You can initiate auth at https://pipedream.com/apps or via the CLI.-->

### Scopes

Pipedream requests the following scopes when you connect your account. [Contact us](https://pipedream.com) to request additional scopes.

| Scope     | Description           |
| ------- | --------------- |
| `Read and Write` | This permission level permits read and write access to Twitter resources, including the ability to read a user’s Tweets, home timeline, and profile information; and to post Tweets, follow users, or update elements of a user’s profile information. It also allows write access to send Direct Messages on behalf of a user (POST direct_messages/events/new) but does not provide the ability to read or delete Direct Messages. |

### OAuth Configuration

Twitter’s API relies on the `OAuth 1.0a` protocol. At a very simplified level, Twitter’s implementation requires that requests needing `authorization` contain an additional HTTP Authorization header. Pipedream integrates with Twitter using the following configuration when you connect your account.

#### Request Token

##### Endpoint

```
https://api.twitter.com/oauth/request_token
```

##### Configuration

###### URL Params

None

###### Header Params (1)

| Key     | Value           |
| ------- | --------------- |
| `OAuth` | `authorization` |

###### Body Params

None

#### Authorization Request

##### Endpoint

```
https://api.twitter.com/oauth/authenticate
```

##### Configuration

###### URL Params (7)

| Key             | Value                              |
| --------------- | ---------------------------------- |
| `client_id`     | `{{oauth.client_id}}`              |
| `state`         | `{{oauth.state}}`                  |
| `redirect_uri`  | `{{oauth.redirect_url}}`           |
| `response_type` | `code`                             |
| `scope`         | `{{oauth.space_separated_scopes}}` |
| `oauth_token`   | `{{oauth.token}}`                  |
| `force_login`   | `true`                             |

###### Header Params

None

###### Body Params

None

#### Access Token Request

##### Endpoint

```
https://api.twitter.com/oauth/access_token
```

##### Configuration

###### URL Params 

None

###### Header Params (2)

| Key            | Value                               |
| -------------- | ----------------------------------- |
| `OAuth`        | `authorization`                     |
| `content-type` | `application/x-www-form-urlencoded` |

###### Body Params

None

#### Refresh Token Request

Not required

## About Pipedream

Pipedream is a serverless integration and compute platform with 100k+ developers, billions of events processed, and 300+ integrated apps with managed auth. 

- Start from scratch or use pre-built, open source components
- Trigger Node.js on HTTP requests, timers, cron schedules, or manually
- Emit data on each event to inspect it or trigger code in Pipedream or your own app
- Manage concurrency, delivery rates and de-duplication of events
- Use the built-in key-value store to manage state across invocations

## Contributing

Deploy or contribute to curated open source components in Pipedream's Github repo. Or author, deploy and maintain your own via your standard CI/CD process.
