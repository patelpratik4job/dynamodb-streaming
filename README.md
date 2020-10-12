## One click deploy
<a href="https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/sameer-goel/dynamodb-streaming" target="_blank"><img src="./images/deplywithamplifyconsole.png" alt="deplywithamplifyconsole"></a>


## To deploy Manualy

You can deploy this app and the back end infrastructure in one of two ways:

1. The Amplify CLI
2. One click deploy button

### Amplify CLI

1. First install and configure the Amplify CLI.

> For a complete walkthrough of how to configure the CLI, see [this video](https://www.youtube.com/watch?v=fWbM5DLh25U)

```sh
$ npm install -g @aws-amplify/cli
$ amplify configure
```

2. Clone the repo, install dependencies

```sh
$ git clone https://github.com/GantMan/enjoytheshow.git
$ cd enjoytheshow
$ npm install
```

3. Initialize the app

```sh
$ amplify init

? Enter a name for the environment: dev (or your preferred env name)
? Choose your default editor: (your preferred editor)
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: your-profile-name

? Do you want to configure Lambda Triggers for Cognito? No
```

4. Deploy the back end

```sh
$ amplify push --y
```

5. Run the app

```sh
$ npm start
```
