const fs = require("fs");
const login = require("fca-unofficial");
const http = require('https');
const pdfdrive = require('pdfdrive-ebook-scraper');
const google = require("googlethis");
const request = require("request");
const {
    Configuration,
    OpenAIApi
} = require("openai");
const NLPCloudClient = require('nlpcloud');
const date = require('./datetime.js');
const {
    keep_alive
} = require("./keep_alive.js");
const cron = require('node-cron');
const axios = require("axios");
const weatherjs = require("weather-js")

let msgs = {};
let cd = {};
let vips = [
    "100071743848974",
    "100016029218667",
    "100077318906152",
    "100037131918629"
];
let sleep = [3000, 2500, 3500, 5000, 4000, 4500, 5500, 3800, 3200, 4800, 4300, 3300, 4600, 5900, 3600]
let sup = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
let hey = ["Sup", "Hey :D", "hey", "Me?", "yes?"];
let whom = ["I'm a long story... About 24h long.", "I'm not too sure", "I never really asked myself this question."];
let threads = ""

let myAccountId = "100071743848974";
let myOtherId = "100016029218667";
let myGirlAccountId = "100077318906152";
let techhJork = "100037131918629";

let debug = false;

let help = "Hello World\n\n";
            help += "Usage: \ncommand [options]\n\n";
            help += "Commands:\n";
            help += "pdf [search]      - find pdf and ebook\n";
            help += "dict [search]     - dictionary\n";
            help += "summ [paragraph]  - summarize paragraph and sentence\n";
            help += "find [search]     - google search\n";
            help += "baybayin [query]  - translate to baybayin\n";
            help += "weather [country] [state] [city] - show current weather status\n";
            help += "facts [query]     - facts meme generator\n";
            help += "ig [username]     - get user instagram info\n";
            help += "changeemo [emoji] - change group chat emoji\n";
            help += "wiki [query]      - search poeple or info from wikipedia\n";
            help += "info [username]   - get user facebook basic info\n";
            help += "nickname [username] [nickname] - change the user nickname\n";
            help += "landscape         - show landscape photos\n";
            help += "portrait          - show portrait photos\n";
            help += "animequote        - show anime qoutes\n";
            help += "motivation        - show motivation messages\n";
            help += "remove            - unsent my messages\n";
            help += "phub              - show p*rnhub meme generator\n";
            help += "qrcode [query]    - show generated qrcode from your query\n";
            help += "uid               - show person user id\n";
            help += "gid               - show the group id\n";
            help += "help              - show help section\n\nall commands mentioned above are minified to fit to a message, some commands may trigger from certain keyword or actions.\nIf you have questions ask me with ? at the end.";

let apiKey = [
    // phub api key
    "CcIDaVqu",
    // graph for facebook access token
    "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662",
    // open ai api key
    "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",
    // urban dictionary api key
    "bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf",
    // nlpcloudclient summarize api key
    "5ab3c279e089139f63017eea409573731d5e8ce9"
];

login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return reportIssue(api, event.threadID, err);
    cron.schedule('*/30 * * * *', () => {
        var hours = date("Asia/Manila").getHours()
        var mins = date("Asia/Manila").getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? '0' + mins : mins;
        reportIssue(api, event.threadID, "Time Check " + hours + ":" + mins + " " + ampm)
        api.sendMessage("Time Check " + hours + ":" + mins + " " + ampm, myAccountId);
    });
    cron.schedule('0 * * * *', () => {
        let A = api.getAppState();
        let B = JSON.stringify(A);
        fs.writeFileSync("fb.json", B, "utf8");
        api.sendMessage("AppState refresh...", myAccountId)
    });

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true
    });

    let settings = JSON.parse(fs.readFileSync("files/settings.json", "utf8"));

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return reportIssue(api, event.threadID, err);

        if (event.type == "message" || event.type == "message_reply") {
        if (debug) {
            let input = event.body;
            let query = removeEmojis(input.trim().toLowerCase());
            if (!(vips.includes(event.senderID))) {
                if (query.startsWith("mj") || query.startsWith("repol") || input.toLowerCase().startsWith("par ") || input.toLowerCase().startsWith("pri ") || query.startsWith("mrepol742") || query.endsWith("?")) {
                    sendMessage(api, event, "Hold on a moment this system is currently in maintenance mode... only authorized uid is allowed to call and initiate its function in the moment.");
                }
                return;
            }
        }
    }

        switch (event.type) {
            case "message":
                if (event.attachments.length != 0) {
                    if (event.attachments[0].type == "photo") {
                        msgs[event.messageID] = ['img', event.attachments[0].url]
                    } else if (event.attachments[0].type == "animated_image") {
                        msgs[event.messageID] = ['gif', event.attachments[0].url]
                    } else if (event.attachments[0].type == "sticker") {
                        msgs[event.messageID] = ['sticker', event.attachments[0].url]
                    } else if (event.attachments[0].type == "video") {
                        msgs[event.messageID] = ['vid', event.attachments[0].url]
                    } else if (event.attachments[0].type == "audio") {
                        msgs[event.messageID] = ['vm', event.attachments[0].url]
                    }
                } else {
                    msgs[event.messageID] = event.body
                    if (event.senderID == myAccountId) {
                        console.log(event.body);
                    }
                }
                ai(api, event);
                break;
            case "message_reply":
                let msgid = event.messageID;
                let input = event.body;
                let query = removeEmojis(input.trim().toLowerCase());
                msgs[msgid] = input;

                if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                    if (event.messageReply.senderID != api.getCurrentUserID()) {
                        sendMessage(api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
                    } else {
                        api.unsendMessage(event.messageReply.messageID);
                    }
                } 

                if (event.senderID == myGirlAccountId) {
                    break;
                }

                ai(api, event);
                
                if (query.startsWith("phub") || query.startsWith("pornhub")) {
                    api.getUserInfo(event.messageReply.senderID, (err, info) => {
                        if (err) return reportIssue(api, event.threadID, err);

                        let name = info[event.messageReply.senderID]['name'];

                        if (event.messageReply.senderID == myAccountId || event.messageReply.senderID == myOtherId) {
                            sendMessage(api, event, "Hahaha.. you cannot do that to my account.. bruhhh..");
                        } else {
                            let data = input.split(" ")
                            if (data.length < 2) {
                                sendMessage(api, event, "Opps! I didnt get it. You should try using phub replytoamessage anytext instead.\nFor example:\nphub huhu");
                            } else {
                                data.shift()
                                var phublink = 'https://manhict.tech/api/phubcmt?text=' + data.join(" ") + '&uid=' + event.messageReply.senderID + '&name=' + name + '&apikey=' + apiKey[0];
                                parseImage(api, event, phublink, __dirname + '/imgs/phubmeme.jpg');
                            }
                        }
                    })
                } else if (query.startsWith("qrcode")) {
                    let body = event.messageReply.body
                    let data = "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + body
                    let f = fs.createWriteStream(__dirname + "/imgs/qr.jpg")
                    let res = request(encodeURI(data))
                    res.pipe(f)
                    f.on("close", () => {
                        var message = {
                            body: body,
                            attachment: fs.createReadStream(__dirname + "/imgs/qr.jpg").on("end", async () => {
                                if (fs.existsSync(__dirname + "/imgs/qr.jpg")) {
                                    fs.unlink(__dirname + "/imgs/qr.jpg", (err) => {
                                        if (err) {
                                            reportIssue(api, event.threadID, err)
                                            sendMessage(api, event, "Unfortunately there was an error occured.");
                                        }
                                    })
                                }
                            })
                        };
                        sendMessage(api, event, message);
                    })
                } 
                break;
            case "message_unsend":
                if (event.senderID == myAccountId && event.senderID == myOtherId) {
                    break;
                }
                    let d = msgs[event.messageID];
                    if (typeof(d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return reportIssue(api, event.threadID, err);
                            else {
                                if (d[0] == "img") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/photo.jpg');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, event.threadID, 'finished downloading photo..')
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this photo: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/photo.jpg')
                                                }

                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "gif") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/animated_image.gif');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, event.threadID, 'finished downloading gif..')
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this GIF: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/animated_image.gif')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/sticker.png');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, event.threadID, 'finished downloading sticker..')
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this Sticker: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/sticker.png')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vid") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/video.mp4');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, event.threadID, 'finished downloading video..')
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this video: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/video.mp4')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vm") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/vm.mp3');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, event.threadID, 'finished downloading audio..')
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this audio: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/vm.mp3')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    } else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return reportIssue(api, event.threadID, err);
                            else {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    api.sendMessage(data[event.senderID]['name'] + " unsent this message: \n\n" + msgs[event.messageID], event.threadID);
                                }
                            }
                        });
                    }
          
            break;
        }
    });
});

function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
 }

 const wiki = async (api, topic, event) =>{
   await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`)
   .then(res=>{
   	 let extract = res.data.extract;
     sendMessage(api, event, `${extract}`);
   }).catch(err=>{
      reportIssue(api, event.threadID, err)
      sendMessage(api, event, `Unfortunately, i am not able to find the "` + topic + `".`);
   })
}


const info = (api, event)=>{
    let { mentions,threadID,messageID,body,senderID } = event
    api.getUserInfo(Object.keys(mentions), async (err, ret) => {
        if(err) return reportIssue(api, event.threadID, err);
        for(var prop in ret) {
            let {vanity,name,gender,isBirthday} = ret[prop]
            let url = encodeURI('https://graph.facebook.com/'+`${prop}`+'/picture?height=720&width=720&access_token=' + apiKey[1])
            let filename = __dirname + "/imgs/"+ prop + ".jpg";
            let msg = `
User ID: ${prop}
Name: ${checkFound(name)}
Username: ${checkFound(vanity)}
Gender: ${gender == 1 ? "female" : "male"}
Birthday: ${checkFound(isBirthday)}  
`
            await download(url,filename,()=>{
                var message = { 
                    body: msg,
                    attachment:fs.createReadStream(filename)
                  };
                api.sendMessage(message,threadID,messageID)     
            })
        }
    });
}

async function ai(api, event) {
    if (event.body != null) {
        let input = event.body;
        let query = removeEmojis(input.trim().toLowerCase());
        if (query.startsWith("mj") || query.startsWith("repol") || input.toLowerCase().startsWith("par ") || input.toLowerCase().startsWith("pri ") || query.startsWith("mrepol742") || query.endsWith("?")) {
            var {
                mentions,
                senderID,
                threadID,
                messageID
            } = event;
            if (input.split(" ").length < 2) {
                if (event.senderID == myGirlAccountId && query.endsWith("?")) {
                    return;
                }
                api.sendMessage("Hello the system status is online and waiting for your reply. \nFor available commands enter help, this project does not disclose any personal data. In aims of breaking apart the line between human and computer.\n\nTHERE IS NO WARRANTY FOR THE SOFTWARE, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE SOFTWARE “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE SOFTWARE IS WITH THE CUSTOMER. SHOULD THE SOFTWARE PROVE DEFECTIVE, THE CUSTOMER ASSUMES THE COST OF ALL NECESSARY SERVICING, REPAIR, OR CORRECTION EXCEPT TO THE EXTENT SET OUT UNDER THE HARDWARE WARRANTY IN THESE TERMS.", threadID, (err) => {
                    if (err) return
                }, messageID)
            } else {
                var text = input;
                if (event.senderID == myGirlAccountId && query.endsWith("?")) {
                    return;
                } else if (query.startsWith("repol")) {
                    text = input.substring(6)
                } else if (input.toLowerCase().startsWith("par ") || input.toLowerCase().startsWith("pri ")) {
                    text = input.substring(5)
                } else if (query.startsWith("mrepol742")) {
                    text = input.substring(10)
                } else if (query.startsWith("mj")) {
                    text = input.substring(3)
                }
                const configuration = new Configuration({
                    apiKey: apiKey[2],
                });
                const openai = new OpenAIApi(configuration);
                const {
                    data
                } = await openai.createCompletion("text-davinci-002", {
                    prompt: text,
                    temperature: 0.5,
                    max_tokens: 4000,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.0,
                });
                let finish = data.choices[0].text;
                if (finish.startsWith("?")) {
                    finish = finish.slice(1);
                }
                api.sendMessage(finish, event.threadID, (err) => {
                    if (err) return reportIssue(api, event.threadID, err)
                }, messageID)
            }
        }
        if (event.senderID == myGirlAccountId) {
            return;
        }
        if (query.startsWith("pdf")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pdf query instead.\nFor example:\npdf fundamentals in engineering")
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;

                    let res = await pdfdrive.findEbook(searched);
                    let res2 = await pdfdrive.getEbook(res[0].ebookUrl);

                    sendMessage(api, event, `${res2.ebookName}\n\n` + `${res2.dlUrl}`)
                } catch (err) {
                    reportIssue(api, event.threadID, err);
                    api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                }
            }
        } else if (query.startsWith("urbandictionary") || query.startsWith("dictionary") || query.startsWith("dict")) {
            var {
                mentions,
                senderID,
                threadID,
                messageID
            } = event;
            if (input.split(" ").length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using urbandictionary query instead.\nFor example:\nurbandictionary computer", threadID, messageID)
            } else {
                var text = input.substring(17)
                if (query.startsWith("dictionary")) {
                    text = input.substring(11)
                } else if (query.startsWith("dict")) {
                    text = input.substring(5)
                }
                const options = {
                    method: 'GET',
                    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
                    params: {
                        term: text
                    },
                    headers: {
                        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
                        'X-RapidAPI-Key': apiKey[3]
                    }
                };
                axios.request(options).then(function({
                    data
                }) {
                    var word = data.list[0].word;
                    var def = data.list[0].definition;
                    var sample = data.list[0].example;
                    var timestamp = data.list[0].written_on;
                    var source = data.list[0].permalink;
                    api.sendMessage(def + "\n\nExample: \n" + sample, threadID, messageID)
                }).catch(function(error) {
                    reportIssue(api, event.threadID, error);
                    api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                });
            }
        } else if (query.startsWith("summarize") || query.startsWith("summ")) {
            var {
                mentions,
                senderID,
                threadID,
                messageID
            } = event;
            if (input.split(" ").length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using summarize message instead.\n\nFor example:\nsummarize this sentence meant to be summarized.", threadID, messageID)
            } else {
                var text = input.substring(11);
                if (query.startsWith("summ")) {
                    text = input.substring(5)
                }
                const client = new NLPCloudClient('bart-large-cnn', apiKey[4])
                client.summarization(text).then(function({
                    data
                }) {
                    api.sendMessage(data.summary_text, threadID, messageID)
                }).catch(function(err) {
                    reportIssue(api, event.threadID, err.response.data.detail);
                    api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                });
            }
        } 

        const searching = async (searched) => {
            let options = {
                page: 0,
                safe: false,
                additional_params: {
                    hl: "en"
                }
            }
            return await google.search(`google ${searched}`, options);
        };

        if (query.startsWith("google") || query.startsWith("search") || query.startsWith("find")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using google query instead.\n\nFor example:\ngoogle computer")
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;
                    let response = await searching(searched);
                    let result = response.results;
                    if (result === undefined || Object.entries(result).length === 0) {
                        throw new Error(`Unfortunately there was an error occured while searching "${searched}"`)
                    }
                    sendMessage(api, event, `${result[0].description}\n\n${result[0].url}`);
                } catch (err) {
                    reportIssue(api, event.threadID, err);
                    sendMessage(api, event, `${err.message}`);
                }
            }
        } else if (query.startsWith("baybayin")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using baybaying query instead.\n\nFor example:\nbaybayin ako ay filipino")
            } else {
                data.shift()
                axios.get('https://api-baybayin-transliterator.vercel.app/?text=' + data.join(" "))
                    .then(response => {
                        sendMessage(api, event, response.data.baybay);
                    })
                    .catch(error => {
                        reportIssue(api, event.threadID, error);
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    })
            }
        } else if (query.startsWith("weather")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using weather country state city instead.\n\nFor example:\nweather philippines ncr caloocan city")
            } else {
                data.shift()
                let weather = await weathersearch("weather " + data.join(" "))
                if (weather.weather == undefined || weather.weather.temperature == undefined) {
                    weatherjs.find({
                        weathersearch: data.join(" "),
                        degreeType: 'C'
                    }, (err, r) => {
                        if (err) return reportIssue(api, err)
                        let d = r[0]
                        let m = "Location: " + d.location.name + "\n"
                        m += "Temperature: " + d.current.temperature + "\n"
                        m += "Sky: " + d.current.skytext + "\n"
                        m += "Observation time: " + d.current.date + " " + d.current.observationtime
                        sendMessage(api, event, m)
                    })
                } else {
                    let output = weather.weather
                    let m = "Location: " + output.location
                    m += "\nForecast: " + output.forecast
                    m += "\nTemperature: " + output.temperature + "°F" + " (" + ((output.temperature - 32) * 5 / 9) + "°C)"
                    if (output.precipitation != undefined)
                        m += "\nPrecipitation: " + output.precipitation
                    if (output.humidity != undefined)
                        m += "\nHumidity: " + output.humidity
                    if (output.wind != undefined)
                        m += "\nWind speed: " + output.wind
                    sendMessage(api, event, m)
                }
            }
        } else if (query.startsWith("facts")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using facts query instead.\n\nFor example:\nfacts about computers")
            } else {
                data.shift()
                var url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
                parseImage(api, event, url, __dirname + '/imgs/facts.png');
            }
        } else if (query.startsWith("instagram") || query.startsWith("insta") || query.startsWith("ig")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using instagram username instead.\n\nFor example:\ninstagram melvinjonesrepol")
            } else {
                data.shift()
                let userN = data.join(" ");
                axios.get('https://api.popcat.xyz/instagram?user=' + userN)
                    .then(response => {
                        var username = response.data.username;
                        var fullname = response.data.full_name;
                        var biography = response.data.biography;
                        var posts = response.data.posts;
                        var reels = new Intl.NumberFormat().format(response.data.reels);
                        var followers = new Intl.NumberFormat().format(response.data.followers);
                        var following = new Intl.NumberFormat().format(response.data.following);
                        var private = ((response.data.private) ? "Yes" : "No");
                        var verified = ((response.data.verified) ? "Yes" : "No");
                        var profilepic = response.data.profile_pic;

                        request(profilepic).pipe(fs.createWriteStream(__dirname + '/imgs/instaprofile.png'))

                            .on('finish', () => {
                                var message = {
                                    body: "Username: " + username + "\nFull Name: " + fullname + "\nBio: " + biography + "\nPosts: " + posts + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified,
                                    attachment: fs.createReadStream(__dirname + '/imgs/instaprofile.png')
                                };
                                sendMessage(api, event, message);
                            })
                    })
                    .catch(error => {
                        reportIssue(api, event.threadID, error);
                        sendMessage(api, event, "Unfortunately user \"" + userN + "\" was not found.");
                    })
            }
        } else if (query.startsWith("changeemo")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using changeemo emoji instead.\n\nFor example:\nchangeemo 😂")
            } else {
                data.shift()
                api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                    if (err) return reportIssue(api, event.threadID, err);
                });
            }
        } else if (query == "uid") {
            if (event.type == "message") {
                sendMessage(api, event, "Your uid is " + event.senderID);
            } else if (event.type == "message_reply") {
                sendMessage(api, event, "His/her uid is " + event.messageReply.senderID);
            }
        } else if (query.startsWith("test") || query.startsWith("hello world") || query.startsWith("hi world")) {
            sendMessage(api, event, "Hello World");
        } else if (query == "hi") {
            sendMessage(api, event, "Hello");
        } else if (query == "hello") {
            sendMessage(api, event, "Hi");
        } else if (query == "sup" || query == "wassup" || query == "what's up" || query == "how are you") {
            sendMessage(api, event, sup[Math.floor(Math.random() * sup.length)]);
        } else if (query.startsWith("hey")) {
            sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        } else if (query.startsWith("who made you") || query.startsWith("who's your creator") || query.startsWith("where do you come from")) {
            sendMessage(api, event, whom[Math.floor(Math.random() * whom.length)]);
        } else if (query.startsWith("sayit")) {
            sendMessage(api, event, "your stupid");
        } else if (query.includes("haha") || query.includes("ahah") || query.includes("ahha") || input.toLowerCase().includes("😂") || input.toLowerCase().includes("🤣") || input.toLowerCase().includes("😆") || query.includes("funny") || query.includes("insane") || query.includes("lol") || query.includes("lmao")) {
            reactMessage(api, event, ":laughing:");
        } else if (query.includes("sad") || query.includes("tired") || query.includes("sick")) {
            reactMessage(api, event, ":sad:");
        } else if (query.includes("angry")) {
            reactMessage(api, event, ":angry:");
        } else if (query.includes("cry")) {
            reactMessage(api, event, ":cry:");
        } else if (query.includes("love") || query == "bot") {
            reactMessage(api, event, ":love:");
        } else if (query.startsWith("goodeve")) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good evening too...");
        } else if (query.startsWith("goodmorn")) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good morning too...");
        } else if (query.startsWith("goodnight")) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good night too...");
        } else if (query.startsWith("goodafter")) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good afternoon too...");
        } else if (query == "tsk") {
            reactMessage(api, event, ":like:");
        } else if (query == "yes") {
            sendMessage(api, event, "No");
        } else if (query == "okay") {
            sendMessage(api, event, "Yup");
        } else if (query == "no") {
            sendMessage(api, event, "Yes");
        } else if (query == "idk") {
            sendMessage(api, event, "i dont know too...");
        } else if (query == "nice" || query == "uwu") {
            reactMessage(api, event, ":heart:");
        } else if (query.includes("nude")) {
            asendMessage(api, event, "Dont!...");
        } else if ((query == "unsendon" || query == "unsenton" || query == "removeon" || query == "deleteon") && !settings.onUnsend) {
            if (vips.includes(event.senderID)) {
            settings.onUnsend = true
            fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")
            reportIssue(api, event.threadID, "unsend enabled");
            } else {
                sendMessage(api, event, "You cannot enable it.. No idea why. Why thought?");
            }
        } else if ((query == "unsendon" || query == "unsenton" || query == "removeon" || query == "deleteon") && settings.onUnsend) {
            if (vips.includes(event.senderID)) {
            settings.onUnsend = false
            fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")
            reportIssue(api, event.threadID, "unsend disabled");
            } else {
                sendMessage(api, event, "Hehe... noo you cannot turn it off...");
            }
        } else if (query == "groupid" || query == "guid") {
            api.getThreadInfo(event.threadID, (err) => {
                if (err) return cosole.log(err);
                else {
                    sendMessage(api, event, "The group id is " + event.threadID);
                }
            });
        } else if (query == "help") {
            sendMessage(api, event, help);
        } else if (query.startsWith("wiki")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using wiki query instead.\n\nFor example:\nwiki google")
            } else {
                wiki(api.sendMessage, input.substring("5"), event);
            }
        } else if (query.startsWith("info")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using info @user instead.\n\nFor example:\ninfo @Melvin Jones Repol")
            } else {
               if (input.includes("@")) {
                   if (event.senderID == myAccountId || event.senderID == myOtherId) {
                      sendMessage(api, event, "Nice try. But it wont gonna work, and i don't know why.")
                      reactMessage(api, event, ":laughing:");
                   } else {
                      info(api, event);
                   }
               } else {
                sendMessage(api, event, "Unable to find information without mentioning someone.")
               }
            }
        } else if (query.startsWith("nickname")) {
            var text = input;
            text = text.substring(26)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using nickname mentioned nickname instead.\nFor example:\nnickname @mrepol742 melvinjonesrepol");
            } else {
                api.getThreadInfo(event.threadID, (err, info) => {
                    var mentionid = `${Object.keys(event.mentions)[0]}`;

                    api.changeNickname(text, `${info.threadID}`, mentionid, (err) => {
                        if (err) return asendMessage(api, event, "Unfortunately there was an error occured while changing \"" + text + "\" nickname.");
                    });
                });
            }
        } else if (query.startsWith("landscape")) {
            parseImage(api, event, "https://source.unsplash.com/1600x900/?landscape", __dirname + '/imgs/landscape.png');
        } else if (query.startsWith("portrait")) {
            parseImage(api, event, "https://source.unsplash.com/900x1600/?portrait", __dirname + '/imgs/portrait.png');
        } else if (query.startsWith("animequote")) {
            axios.get('https://animechan.vercel.app/api/random')
                .then(response => {
                    sendMessage(api, event, "'" + response.data.quote + "'" + "\n\n- " + response.data.character + " (" + response.data.anime + ")");
                })
                .catch(error => {
                    reportIssue(api, event.threadID, error);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                });
        } else if (query.startsWith("motivation")) {
            qt("motivation").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, esponse);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `${response[i].q} \n\n- ${response[i].a}\n\n`
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query == "refresh" || query == "reload") {
            if (vips.includes(event.senderID)) {
            let A = api.getAppState();
            let B = await JSON.stringify(A);
            fs.writeFileSync("fb.json", B, "utf8");
            sendMessage(api, event, "AppState Refreshed Successfully!.");
            } else {
                sendMessage(api, event, "Unable to do such action...");
            }
        }
        
    }
}

function parseImage(api, event, url, dir) {
    request(url).pipe(fs.createWriteStream(dir))
    .on('finish', () => {
        let image = {
            attachment: fs.createReadStream(dir)
        };
        sendMessage(api, event, image);
    })
}

function reportIssue(api, event, err) {
    console.log(err);
    api.getThreadInfo(event, (err, info) => {
        if (err) return console.log(err);
        else {
            api.sendMessage(err, myAccountId);
        }
    });
}

function sendMessage(api, event, message) {
    wait(sleep[Math.floor(Math.random() * sleep.length)])
    api.sendMessage(message, event.threadID, event.messageID);
}

function reactMessage(api, event, reaction) {
    wait(sleep[Math.floor(Math.random() * sleep.length)])
    api.setMessageReaction(reaction, event.messageID);
}

function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}

function holdOn() {
    if (!(vips.includes(event.senderID))) {
        if (!(event.senderID in cd)) {
            cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
        } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
            sendMessage(api, event, "Hold on... Your asking too much wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds");
            return true;
        } else {
            cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
        }
    }
    return false;
}

var download = async function(uri, filename, callback){
    await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};

const checkFound = (text) =>{
    return text ? text : "undefined" 
}

async function weathersearch(location) {
    let result = await google.search(location, {
        page: 0,
        safe: true,
        additional_parameters: {
            hl: "en"
        }
    })
    return result
}

async function qt() {
    let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => {
        return response.data
    }).catch((err) => {
        return null
    });
    return qoute
}