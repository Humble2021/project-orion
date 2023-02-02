/*
 *
 * Copyright (c) 2023 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the Mrepol742 License, version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/Project-Orion/blob/master/LICENSE
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const fs = require("fs");
const login = require("fca-unofficial");
const http = require('https');
const pdfdrive = require('pdfdrive-ebook-scraper');
const request = require("request");
const {
    Configuration,
    OpenAIApi
} = require("openai");
const NLPCloudClient = require('nlpcloud');
const cron = require('node-cron');
const axios = require("axios");
const weatherjs = require("weather-js")
const FormData = require('form-data');
const path = require('path');
const Innertube = require('youtubei.js');
const GoogleImages = require('google-images');
const google = require('googlethis');
const os = require('os');
const NetworkSpeed = require('network-speed')
const process_p = require('process');
const googleTTS = require('google-tts-api');
const mathjs = require('mathjs')
const dns = require("dns");
const { wordsToNumbers } = require('words-to-numbers');

const pictographic = /\p{Extended_Pictographic}/ug;
const latinC = /[^a-z0-9\s]/gi;
const normalize = /[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g;
const port = process.env.PORT || 6000;

let sleep = [4000, 3000, 5000, 4500, 6000, 5500, 3300, 4400, 5050, 4000, 5000, 6500, 4500, 3600];
let sup = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
let hey = ["Sup", "Hey :D", "hey", "yup?", "yes?", "How are you?", "How you doing?", "wassup", "whats new?", "how can i help you?"];
let unsendMessage = ["deleted the following.", "unsent the following.", "tries to delete this message.", "removed a message that contains:", "remove a message.", "tries conceal this information."]
let idknow = ["Can you clarify what do you mean by that. It seems i have problems trying to understand what you want me to do.", "Please elaborate on what you mean by that. I seem to be struggling to comprehend what you want me to do.", "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do.", "Could you please elaborate on what you mean? Trying to grasp what you want me to accomplish seems to be a challenge for me.", "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do."]
let funD = ["🤣🤣🤣", "🤣", "😆😆", "😂😂🤣🤣", "😆😆🤣", "😂😆", "😆", "ahahaahh", "hahahahhah", "haahaaa", "ahhaa😂", "hhahahah😆", "🤣🤣hahaahhaha", "hahaa😆🤣"];
let mjme = ["Mj", "Melvin Jones Repol", "Melvin Jones Gallano Repol"]
let goodev = ["Good evening too... The sun set is so beautiful as always, hope you're seeing it too.", "Good evening, as well. As always, the sun set is quite lovely; I hope you can see it as well.", "Good evening as well... As always, the sun set is breathtaking; I hope you can see it too."]
let goodmo = ["Good morning too... Have a great day ahead, and always don't forget breakfast must be the heaviest meal of the day.", "Also good morning... Enjoy your day, and never forget that breakfast should always be the heaviest meal of the day.", "Greetings as well... Have a fantastic day, and never forget that breakfast ought to be the largest meal of the day."]
let goodni = ["Good night too... Have a nice and comfortable sleep, don't forget to wakeup early.", "Good night, as well. Sleep well and comfortably, and remember to get up early.", "Also good night. Enjoy a restful night's sleep, and remember to get up early."]
let goodaf = ["Good afternoon too... It's quite hot now.. Always remember to stay hydrated.", "Also good afternoon... Right now it's very hot. Never forget to drink plenty of water.", "Good afternoon, as well. Now that it's hot, Keep in mind to drink plenty of water."]
let tips = ["Be detailed but brief", "Ask me like Who are you?", "Ask me like How to do this?"]
let sqq = ["in", "having", "an", "do", "does", "with", "are", "was", "the", "as far", "can you", "a", "did", "give", "example", "these", "those", "on", "is", "if", "for", "about", "gave", "there", "describe", "list", "identify"];
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let happyEE = ['haha', 'ahah', 'ahha', 'funny ', 'insane ', 'lol', 'lmao', 'lmfao', 'silly ', 'laugh ', 'laughable', 'humorous', 'amusing', 'hilarious', 'absurd', 'ridicolous', 'ludicrous', 'entertaining']
let sadEE = ['pain', 'painful', 'cry ', 'crying ', 'unhappy', 'sad ', 'tired', 'sick ', 'dejected', 'regretful', 'depressed', 'downcast', 'miserable ', 'downhearted', 'heartbroken', 'wretched', 'doleful', 'low-spirited', 'sorry', 'disgraceful', 'regrettable', 'sorrowful', 'upsetting', 'traumatic', 'truma', 'pitiful', 'depressing', 'depress', 'unfortunate', 'awful', 'miserable', 'grievous', 'cheerless'];
let angryEE = ['angry', 'irate', 'irritated', 'furious', 'raving', 'bitter', 'hostile', 'outraged', 'incensed', 'mad ', 'filthy', 'displeased', 'provoked', 'annoyed', 'fury ', 'rage ', 'ire ', 'wrath']
let loveEE = ['love', 'liking', 'appreciation', 'thank', 'delight', 'pleasure', 'regards', 'respects', 'dear', 'darling', 'boyfriend', 'girlfriend', 'sweetheart', 'angel', 'honey', 'adore', 'treasure', 'prize', 'devotion', 'friend']
let sizesM = ["Bytes", "KB", "MB", "GB", "TB"]
let example = ["For instance:", "For example:", "Like:", "Suppose that:", "e.g:", "In particular:", "To give you an idea:", "Let's say:", "Example:"];
let gcolor = {
    "DefaultBlue": "196241301102133",
    "HotPink": "169463077092846",
    "AquaBlue": "2442142322678320",
    "BrightPurple": "234137870477637",
    "CoralPink": "980963458735625",
    "Orange": "175615189761153",
    "Green": "2136751179887052",
    "LavenderPurple": "2058653964378557",
    "Red": "2129984390566328",
    "Yellow": "174636906462322",
    "TealBlue": "1928399724138152",
    "Aqua": "417639218648241",
    "Mango": "930060997172551",
    "Berry": "164535220883264",
    "Citrus": "370940413392601",
    "Candy": "205488546921017"
}
let gcolorn = ["DefaultBlue", "HotPink", "AquaBlue", "BrightPurple", "CoralPink", "Orange", "Green", "LavenderPurple", "Red", "Yellow", "TealBlue", "Aqua", "Mango", "Berry", "Citrus", "Candy"]
let timeZones = ['Europe/Andorra', 'Asia/Dubai', 'Asia/Kabul', 'Europe/Tirane', 'Asia/Yerevan', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Mawson', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'America/Argentina/Buenos_Aires', 'America/Argentina/Cordoba', 'America/Argentina/Salta', 'America/Argentina/Jujuy', 'America/Argentina/Tucuman', 'America/Argentina/Catamarca', 'America/Argentina/La_Rioja', 'America/Argentina/San_Juan', 'America/Argentina/Mendoza', 'America/Argentina/San_Luis', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Ushuaia', 'Pacific/Pago_Pago', 'Europe/Vienna', 'Australia/Lord_Howe', 'Antarctica/Macquarie', 'Australia/Hobart', 'Australia/Currie', 'Australia/Melbourne', 'Australia/Sydney', 'Australia/Broken_Hill', 'Australia/Brisbane', 'Australia/Lindeman', 'Australia/Adelaide', 'Australia/Darwin', 'Australia/Perth', 'Australia/Eucla', 'Asia/Baku', 'America/Barbados', 'Asia/Dhaka', 'Europe/Brussels', 'Europe/Sofia', 'Atlantic/Bermuda', 'Asia/Brunei', 'America/La_Paz', 'America/Noronha', 'America/Belem', 'America/Fortaleza', 'America/Recife', 'America/Araguaina', 'America/Maceio', 'America/Bahia', 'America/Sao_Paulo', 'America/Campo_Grande', 'America/Cuiaba', 'America/Santarem', 'America/Porto_Velho', 'America/Boa_Vista', 'America/Manaus', 'America/Eirunepe', 'America/Rio_Branco', 'America/Nassau', 'Asia/Thimphu', 'Europe/Minsk', 'America/Belize', 'America/St_Johns', 'America/Halifax', 'America/Glace_Bay', 'America/Moncton', 'America/Goose_Bay', 'America/Blanc-Sablon', 'America/Toronto', 'America/Nipigon', 'America/Thunder_Bay', 'America/Iqaluit', 'America/Pangnirtung', 'America/Atikokan', 'America/Winnipeg', 'America/Rainy_River', 'America/Resolute', 'America/Rankin_Inlet', 'America/Regina', 'America/Swift_Current', 'America/Edmonton', 'America/Cambridge_Bay', 'America/Yellowknife', 'America/Inuvik', 'America/Creston', 'America/Dawson_Creek', 'America/Fort_Nelson', 'America/Vancouver', 'America/Whitehorse', 'America/Dawson', 'Indian/Cocos', 'Europe/Zurich', 'Africa/Abidjan', 'Pacific/Rarotonga', 'America/Santiago', 'America/Punta_Arenas', 'Pacific/Easter', 'Asia/Shanghai', 'Asia/Urumqi', 'America/Bogota', 'America/Costa_Rica', 'America/Havana', 'Atlantic/Cape_Verde', 'America/Curacao', 'Indian/Christmas', 'Asia/Nicosia', 'Asia/Famagusta', 'Europe/Prague', 'Europe/Berlin', 'Europe/Copenhagen', 'America/Santo_Domingo', 'Africa/Algiers', 'America/Guayaquil', 'Pacific/Galapagos', 'Europe/Tallinn', 'Africa/Cairo', 'Africa/El_Aaiun', 'Europe/Madrid', 'Africa/Ceuta', 'Atlantic/Canary', 'Europe/Helsinki', 'Pacific/Fiji', 'Atlantic/Stanley', 'Pacific/Chuuk', 'Pacific/Pohnpei', 'Pacific/Kosrae', 'Atlantic/Faroe', 'Europe/Paris', 'Europe/London', 'Asia/Tbilisi', 'America/Cayenne', 'Africa/Accra', 'Europe/Gibraltar', 'America/Godthab', 'America/Danmarkshavn', 'America/Scoresbysund', 'America/Thule', 'Europe/Athens', 'Atlantic/South_Georgia', 'America/Guatemala', 'Pacific/Guam', 'Africa/Bissau', 'America/Guyana', 'Asia/Hong_Kong', 'America/Tegucigalpa', 'America/Port-au-Prince', 'Europe/Budapest', 'Asia/Jakarta', 'Asia/Pontianak', 'Asia/Makassar', 'Asia/Jayapura', 'Europe/Dublin', 'Asia/Jerusalem', 'Asia/Kolkata', 'Indian/Chagos', 'Asia/Baghdad', 'Asia/Tehran', 'Atlantic/Reykjavik', 'Europe/Rome', 'America/Jamaica', 'Asia/Amman', 'Asia/Tokyo', 'Africa/Nairobi', 'Asia/Bishkek', 'Pacific/Tarawa', 'Pacific/Enderbury', 'Pacific/Kiritimati', 'Asia/Pyongyang', 'Asia/Seoul', 'Asia/Almaty', 'Asia/Qyzylorda', 'Asia/Qostanay', 'Asia/Aqtobe', 'Asia/Aqtau', 'Asia/Atyrau', 'Asia/Oral', 'Asia/Beirut', 'Asia/Colombo', 'Africa/Monrovia', 'Europe/Vilnius', 'Europe/Luxembourg', 'Europe/Riga', 'Africa/Tripoli', 'Africa/Casablanca', 'Europe/Monaco', 'Europe/Chisinau', 'Pacific/Majuro', 'Pacific/Kwajalein', 'Asia/Yangon', 'Asia/Ulaanbaatar', 'Asia/Hovd', 'Asia/Choibalsan', 'Asia/Macau', 'America/Martinique', 'Europe/Malta', 'Indian/Mauritius', 'Indian/Maldives', 'America/Mexico_City', 'America/Cancun', 'America/Merida', 'America/Monterrey', 'America/Matamoros', 'America/Mazatlan', 'America/Chihuahua', 'America/Ojinaga', 'America/Hermosillo', 'America/Tijuana', 'America/Bahia_Banderas', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Africa/Maputo', 'Africa/Windhoek', 'Pacific/Noumea', 'Pacific/Norfolk', 'Africa/Lagos', 'America/Managua', 'Europe/Amsterdam', 'Europe/Oslo', 'Asia/Kathmandu', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Auckland', 'Pacific/Chatham', 'America/Panama', 'America/Lima', 'Pacific/Tahiti', 'Pacific/Marquesas', 'Pacific/Gambier', 'Pacific/Port_Moresby', 'Pacific/Bougainville', 'Asia/Manila', 'Asia/Karachi', 'Europe/Warsaw', 'America/Miquelon', 'Pacific/Pitcairn', 'America/Puerto_Rico', 'Asia/Gaza', 'Asia/Hebron', 'Europe/Lisbon', 'Atlantic/Madeira', 'Atlantic/Azores', 'Pacific/Palau', 'America/Asuncion', 'Asia/Qatar', 'Indian/Reunion', 'Europe/Bucharest', 'Europe/Belgrade', 'Europe/Kaliningrad', 'Europe/Moscow', 'Europe/Simferopol', 'Europe/Kirov', 'Europe/Astrakhan', 'Europe/Volgograd', 'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Samara', 'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Barnaul', 'Asia/Tomsk', 'Asia/Novokuznetsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Chita', 'Asia/Yakutsk', 'Asia/Khandyga', 'Asia/Vladivostok', 'Asia/Ust-Nera', 'Asia/Magadan', 'Asia/Sakhalin', 'Asia/Srednekolymsk', 'Asia/Kamchatka', 'Asia/Anadyr', 'Asia/Riyadh', 'Pacific/Guadalcanal', 'Indian/Mahe', 'Africa/Khartoum', 'Europe/Stockholm', 'Asia/Singapore', 'America/Paramaribo', 'Africa/Juba', 'Africa/Sao_Tome', 'America/El_Salvador', 'Asia/Damascus', 'America/Grand_Turk', 'Africa/Ndjamena', 'Indian/Kerguelen', 'Asia/Bangkok', 'Asia/Dushanbe', 'Pacific/Fakaofo', 'Asia/Dili', 'Asia/Ashgabat', 'Africa/Tunis', 'Pacific/Tongatapu', 'Europe/Istanbul', 'America/Port_of_Spain', 'Pacific/Funafuti', 'Asia/Taipei', 'Europe/Kiev', 'Europe/Uzhgorod', 'Europe/Zaporozhye', 'Pacific/Wake', 'America/New_York', 'America/Detroit', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Indiana/Indianapolis', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/Chicago', 'America/Indiana/Tell_City', 'America/Indiana/Knox', 'America/Menominee', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/North_Dakota/Beulah', 'America/Denver', 'America/Boise', 'America/Phoenix', 'America/Los_Angeles', 'America/Anchorage', 'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat', 'America/Nome', 'America/Adak', 'Pacific/Honolulu', 'America/Montevideo', 'Asia/Samarkand', 'Asia/Tashkent', 'America/Caracas', 'Asia/Ho_Chi_Minh', 'Pacific/Efate', 'Pacific/Wallis', 'Pacific/Apia', 'Africa/Johannesburg'];
let threads = ""
let threadIdMV = {};
let cmd = {};
let cmd1 = {};
let emo = {};
let threadMaintenance = {};
let userWhoSendDamnReports = {};
let nwww = {};
let messagesD = "N/A";
let fb_stateD = "N/A";
let err400 = 0;

let itbody = "I'm Mj a ChatBot AI trained by billions of billions of parameters. Trained to interact like human in conversational or in speaking manner. I could answer most of questions accurately, for list of commands message `cmd`.\nIf you have any questions don't hesitate to ask.\n\nhttps://mrepol742.github.io/project-orion/\n©2023 Melvin Jones Repol";
let qot = ["The object will not change its motion unless a force acts on it.",
    "The object is equal to its mass times its acceleration.",
    "There is an equal and opposite reaction for every action.",
    "Energy can neither be created nor destroyed, but it can be changed from one form to another.",
    "The radiant intensity from the ideal diffusely reflecting surface and cosine of the angle θ between the direction of incident light and surface normal are directly proportional.",
    "For a system of mass of particles, the sum of the difference of the force acting on the system and the time derivatives of the momenta is zero when projected onto any virtual displacement.",
    "The velocity of the galaxy, which is also known as the redshift, is directly proportional to its distance.",
    "For a given material, the sample path length and concentration of the sample are directly proportional to the absorbance of the light.",
    "The intensity of the radiation is inversely proportional to the square of the distance.",
    "The intensity of the light to an observer from a source is inversely proportional to the square of the distance from the observer to the source.",
    "The the strain of the material is proportional to the applied stress within the elastic limit of that material.",
    "Every point on a wavefront is in itself the source of spherical wavelets which spread out in the forward direction at the speed of light. The sum of these spherical wavelets forms the wavefront.",
    "If the net external force acting on a system of bodies is zero, then the momentum of the system remains constant.",
    "The product of the pressure and the volume of one gram molecule of an ideal gas is equal to the product of the absolute temperature of the gas and the universal gas constant.",
    "The upward buoyant force that is exerted on a body immersed in a fluid, whether partially or fully submerged, is equal to the weight of the fluid that the body displaces and acts in the upward direction at the center of mass of the displaced fluid.",
    "The molar flux due to diffusion is proportional to the concentration gradient.",
    "The external static pressure applied on a confined liquid is distributed or transmitted evenly throughout the liquid in all directions."
]

let help = `
_______  Project Orion 1/8  _______
|
|   ⦿ cmd
|   ⦿ cmd [number|all]
|   ⦿ cmd [admin|root]
|   ⦿ ping
|   ⦿ stats
|   ⦿ uptime
|   ⦿ sysinfo
|   ⦿ sendReport [text]
|   ⦿ mj [text]
|   ⦿ search [text]
|   ⦿ searchincog [text]
|   ⦿ searchimg [text]
|   ⦿ gencode [text]
|   ⦿ dictionary [text]
|   ⦿ say [text]
|   ⦿ baybayin [text]
|   ⦿ weather [location]
|   ⦿ music [text]
|   ⦿ video [text]
|   ⦿ lyrics [text
|   ⦿ encode64 [text]
|   ⦿ decode64 [text]
|   ⦿ github [username]
|   ⦿ ig [username]
|   ⦿ tiktok [username]
|__________________________________
`;

let help1 = `
_______  Project Orion 2/8  _______
|
|   ⦿ thoughts
|   ⦿ lulcat [text]
|   ⦿ gemoji [emoji]
|   ⦿ gname [text]
|   ⦿ wiki [text]
|   ⦿ urlshort [url]
|   ⦿ pickup
|   ⦿ landscape
|   ⦿ landscape [text]
|   ⦿ portrait
|   ⦿ portrait [text]
|   ⦿ problem [equation]
|   ⦿ roi [revenue] [cost]
|   ⦿ pin add
|   ⦿ pin remove
|   ⦿ sadcat [text]
|   ⦿ biden [text]
|   ⦿ pika [text]
|   ⦿ god [text]
|   ⦿ qrcode [text]
|__________________________________
`;

let help2 = `
_______  Project Orion 3/8  _______
|
|   ⦿ verse today
|   ⦿ verse random
|   ⦿ verse [book] [chapter]:[verse]
|   ⦿ animeqoute
|   ⦿ bgremove
|   ⦿ motivate
|   ⦿ inspiration
|   ⦿ advice
|   ⦿ alert [text]
|   ⦿ meme
|   ⦿ lovetest [name1]: [name2]
|   ⦿ drake [text1]: [text2]
|   ⦿ pooh [text1]: [text2]
|   ⦿ oogway [text]
|   ⦿ caution [text]
|   ⦿ element [name]
|   ⦿ imdb [title]
|   ⦿ steam [name]
|   ⦿ npm [name]
|   ⦿ gname";
|__________________________________
`;

let help3 = `
_______  Project Orion 4/8  _______
|
|   ⦿ mnm @mention|@me
|   ⦿ facebook @mention|@me
|   ⦿ nickname @mention|@me [text]
|   ⦿ invert @mention|@me
|   ⦿ greyscale @mention|@me
|   ⦿ ship @mention @mention
|   ⦿ www @mention @mention
|   ⦿ jokeover @mention|@me
|   ⦿ translate [language] [text]
|   ⦿ kiss @mention|@me
|   ⦿ pet @mention|@me
|   ⦿ jail @mention|@me
|   ⦿ communist @mention|@me
|   ⦿ wanted @mention|@me
|   ⦿ gun @mention|@me
|   ⦿ drip @mention|@me
|   ⦿ clown @mention|@me
|   ⦿ uncover @mention|@me
|   ⦿ advert @mention|@me
|   ⦿ blur @mention|@me
|__________________________________
`;

let help4 = `
_______  Project Orion 5/8  _______
|
|   ⦿ phub [text]
|   ⦿ morse [text]
|   ⦿ joke
|   ⦿ profilepic
|   ⦿ wyr
|   ⦿ 8ball
|   ⦿ gmember
|   ⦿ car
|   ⦿ color
|   ⦿ sim [text]
|   ⦿ trump [text]
|   ⦿ mock [text]
|   ⦿ reverse [text]
|   ⦿ itunes [title]
|   ⦿ coding
|   ⦿ newyear
|   ⦿ christmas
|   ⦿ barrier
|   ⦿ fact
|   ⦿ thoughts
|__________________________________
`;

let help5 = `
_______  Project Orion 6/8  _______
|
|   ⦿ uid
|   ⦿ guid
|   ⦿ facts [text]
|   ⦿ doublestruck [text]
|   ⦿ count
|   ⦿ count --vowels
|   ⦿ count --consonants
|   ⦿ wfind [text]
|   ⦿ time
|   ⦿ time [timezone]
|   ⦿ anime [category]
\n|       waifu, megumin, bully, cuddle
\n|       hug, awoo, kiss, lick
\n|       pat, smug, bonk, yeet
\n|       blush, smile, wave, highfive
\n|       handhold, nom, biteglomp, slap
\n|       kill, kick, happy, wink
\n|       pokedance, cringe, cry, etc...
|   ⦿ hanime [category]
|__________________________________
`;

let help6 = `
_______  Project Orion 7/8  _______
|
|   ⦿ conan
|   ⦿ addUser [uid]
|   ⦿ gphoto
|   ⦿ encodeBinary [text]
|   ⦿ decodeBinary [text]
|   ⦿ ttsjap [text]
|   ⦿ pdf [text]
|   ⦿ website [urrl]
|   ⦿ mean [numbers]
|   ⦿ median [numbers]
|   ⦿ mode [numbers]
|   ⦿ range [numbers]
|   ⦿ cdfnormal [x] [μ] [σ]
|   ⦿ divisible [number] [number]
|   ⦿ factorial [number]
|   ⦿ findGCD [number]
|   ⦿ smartReply [on|off]
|   ⦿ summ [text]
|   ⦿ gcolor [theme]
\n|       DefaultBlue, HotPink, AquaBlue, BrightPurple
\n|       CoralPink, Orange, Green, LavenderPurple
\n|       Red, Yellow, TealBlue, Aqua
\n|       Mango, Berry, Citrus, Candy
|__________________________________
`;

let help7 = `
_______  Project Orion 8/8  _______
|
|   ⦿ animecouples
|   ⦿ cosplay
|   ⦿ motor
|   ⦿ darkjoke
|   ⦿ blackpink
|   ⦿ hololive
|   ⦿ mute
|   ⦿ unmute
|   ⦿ tagalogSupport [on|off]
|   ⦿ textToSpeech [on|off]
|   ⦿ meowfacts
|   ⦿ dns4 [url]
|   ⦿ dns6 [url]
|   ⦿ musiclyric [title]
|   ⦿ videolyric [title]
|   ⦿ formatNumbers [numbers]
|   ⦿ wordsToNumbers [words]
|__________________________________
`;

let helpadmin = `
_______  Project Orion Admin  _______
|
|   ⦿ unsend
|   ⦿ unsend [on|off]
|   ⦿ delay [on|off]
|   ⦿ nsfw [on|off]
|   ⦿ debug [on|off]
|   ⦿ antiLeave [on|off]
|   ⦿ welcomeMessage [on|off]
|   ⦿ leavingMessage [on|off]
|   ⦿ simultaneousExecution [on|off]
|   ⦿ clearCache
|   ⦿ refreshState
|   ⦿ saveState
|   ⦿ addAdmin @mention
|   ⦿ remAdmin @mention
|   ⦿ kickUser @mention
|   ⦿ blockUser @mention
|   ⦿ unblockUser @mention
|   ⦿ blockGroup
|   ⦿ unblockGroup
|   ⦿ listblocks
|   ⦿ listadmins
|   ⦿ listmuted
|   ⦿ setPrefix [prefix]
|   ⦿ remPrefix
|   ⦿ ignore [prefix]
|   ⦿ setkey [name]:[key]
|____________________________________
`;

let helproot = `
_______  Project Orion Root  _______
|
|   ⦿ stop
|   ⦿ resume
|   ⦿ restart
|   ⦿ notify
|   ⦿ refreshGroup
|   ⦿ setMaxImage [integer]
|   ⦿ setTimezone [timezone]
|   ⦿ setTextComplextion [complextion]
|   ⦿ setMaxTokens [integer]
|   ⦿ setTemperature [integer]
|   ⦿ setFrequencyPenalty [integer]
|   ⦿ setProbabilityMass [integer]
|   ⦿ setAutoMarkRead [on|off]
|   ⦿ setOnline [on|off]
|   ⦿ setSelfListen [on|off]
|   ⦿ setSendTypingIndicator [on|off]
|   ⦿ setAutoMarkDelivery [on|off]
|____________________________________
`;

let apiKey = [
    // manhict.tech/api
    "CcIDaVqu",
    // graph.facebook.com
    "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662",
    // mashape-community-urban-dictionary.p.rapidapi.com
    "bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf",
    // NLPCloudClient summarize
    "40286240a47c02b2948a8c61276be7bd481b0b14",
    // open ai api key
    "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"
];

let settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json", "utf8"));
let pinned = JSON.parse(fs.readFileSync(__dirname + "/pinned.json", "utf8"));
let adm = JSON.parse(fs.readFileSync(__dirname + "/admin.json", "utf8"));
let nonRRR = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf8"));
let blockRRR = JSON.parse(fs.readFileSync(__dirname + "/block_users.json", "utf8"));
let blockSSS = JSON.parse(fs.readFileSync(__dirname + "/block_groups.json", "utf8"));
let mutedRRR = JSON.parse(fs.readFileSync(__dirname + "/muted_users.json", "utf8"));
let msgs = JSON.parse(fs.readFileSync(__dirname + "/msgs.json", "utf8"));
let smartRRR = JSON.parse(fs.readFileSync(__dirname + "/smart_reply.json", "utf8"));
let ipaddress = JSON.parse(fs.readFileSync(__dirname + "/ip_address.json", "utf8"));
let unsend_msgs = JSON.parse(fs.readFileSync(__dirname + "/unsend_msgs.json", "utf8"));
let group = JSON.parse(fs.readFileSync(__dirname + "/group.json", "utf8"));
let ignoredPrefix = JSON.parse(fs.readFileSync(__dirname + "/ignored_prefixes.json", "utf8"));
let speech = JSON.parse(fs.readFileSync(__dirname + "/speech.json", "utf8"));
let restart = JSON.parse(fs.readFileSync(__dirname + "/restart.json", "utf8"));
let keys = JSON.parse(fs.readFileSync(__dirname + "/key.json", "utf8"));

const app = express();
const config = new Configuration({
    apiKey: keys.ai,
});
const openai = new OpenAIApi(config);

let isCalled = true;

app.get('/', (req, res) => res.send(fs.readFileSync(__dirname + "/index.html", "utf8")));

app.listen(port, () =>
    log(`Project Orion ONLINE`)
);

dns.resolve4("project-orion.mrepol742.repl.co", (err, addresses) => {
    if (err) {
        log(err);
        return;
    }
    log("url https://project-orion.mrepol742.repl.co");
    if (ipaddress.length == 0) {
        ipaddress.push(addresses[0]);
        fs.writeFileSync(__dirname + "/ip_address.json", JSON.stringify(ipaddress), "utf8");
        log("new_ip_address " + addresses[0]);
    } else if (ipaddress.includes(addresses[0])) {
        log("ip_address " + addresses[0]);
    } else {
        ipaddress.push(addresses[0]);
        fs.writeFileSync(__dirname + "/ip_address.json", JSON.stringify(ipaddress), "utf8");
        log("ip_changes_to_address " + addresses[0]);
    }
});

process.on('beforeExit', (code) => {
    log('process_before_exit ' + code);
});

process.on('exit', (code) => {
    log('process_exit ' + code);
});

process.on('SIGINT', function() {
    log("\n\n\tCaught interrupt signal\n\tProject Orion OFFLINE");
    fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
    fs.writeFileSync(__dirname + "/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
    fs.writeFileSync(__dirname + "/group.json", JSON.stringify(group), "utf8");
    process.exit();
});

login({
    appState: JSON.parse(fs.readFileSync(__dirname + "/app_state.json", "utf8"))
}, (err, api) => {
    if (err) return log(err);

    process.on('uncaughtException', (err, origin) => {
let message = `
____  Caught Exception  ____
|
|   ⦿ Error: ` + err + `
|___________________________
        `;
        log(message)
        api.sendMessage(message, getMyId(), (err, messageInfo) => {
            if (err) log(err);
        })
    });

    process.on('unhandledRejection', (reason, promise) => {
let message = `
___  Unhandled Rejection  ___
|
|   ⦿ Reason: ` + reason + `
|____________________________
`;
        log(message);
        api.sendMessage(message, getMyId(), (err, messageInfo) => {
            if (err) log(err);
        })
    });

    cron.schedule('*/10 * * * *', () => {
        fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
        fs.writeFileSync(__dirname + "/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
        fs.writeFileSync(__dirname + "/group.json", JSON.stringify(group), "utf8");
        messagesD = getFormattedDate();
        log("save_state");
    },
    {
        scheduled: true,
        timezone: "Asia/Manila"
    });

    cron.schedule('0 * * * *', () => {
        fs.writeFileSync(__dirname + "/app_state.json", JSON.stringify(api.getAppState()), "utf8");
        fb_stateD = getFormattedDate();
        log("fb_save_state")
    },
    {
        scheduled: true,
        timezone: "Asia/Manila"
    });

    api.setOptions({
        listenEvents: true,
        selfListen: true,
        autoMarkRead: true,
        logLevel: "silent",
        online: true
    });

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return log(err);

        if (event.body == null && !(typeof event.body === "string") && !(event.type == "message_unsend" || event.type == "event")) {
            return;
        }

        if (event.senderID == getMyId() && (event.type == "message" || event.type == "message_reply")) {
            let body = event.body;
            if (!body.startsWith("_")) {
                return;
            } else {
                event.body = body.slice(1);
            }
        }

        if (event.type == "message" || (event.type == "message_reply" && (event.senderID != getMyId() || event.messageReply.senderID != getMyId()))) {

        let input = event.body;
        let query = formatQuery(input.replace(/\s+/g, ''));
        let query2 = formatQuery(input);
            if (query == "unblockgroup") {
                if (adm.includes(event.senderID)) {
                    api.getThreadInfo(event.threadID, (err, gc) => {
                        if (err) return log(err);
                        if (gc.isGroup) {
                            unblockGroup(api, event, event.threadID);
                        } else {
                            sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    });
                }
            } else if (query == "unmute") {
                if (mutedRRR.includes(event.senderID)) {
                    sendMessage(true, api, event, "The user is not blocked.");
                    mutedRRR = mutedRRR.filter(item => item !== event.senderID);
                    sendMessage(true, api, event, "You can now use my commands.");
                    fs.writeFileSync(__dirname + "/muted_users.json", JSON.stringify(mutedRRR), "utf8");
                }
            } else if (query == "status") {
                if (mutedRRR.includes(event.senderID)) {
                    sendMessage(true, api, event, "You are muted please enter `unmute` for you to use the bot commands");
                } else if (blockSSS.includes(event.threadID)) {
                    sendMessage(true, api, event, "This group is blocked. Contact the bot admims for more info.");
                } else if (blockRRR.includes(event.senderID)) {
                    sendMessage(true, api, event, "You are blocked from using the bot commands. Contact the bot admims for more info.");
                } else if (settings.isStop) {
                    sendMessage(true, api, event, "The program is currently offline.");
                } else if (settings.isDebugEnabled ) {
                    sendMessage(true, api, event, "The program is currently under maintenance.");
                } else { 
                    sendMessage(true, api, event, "PROJECT ORION ONLINE AND WAITING FOR COMMANDS");
                }
            } else if ((blockRRR.includes(event.senderID) || blockSSS.includes(event.threadID) || mutedRRR.includes(event.senderID)) && 
            (event.type == "message" || event.type == "message_reply")) {
                saveEvent(event);
                return;
            } 
            /*
            else {
                let ttb = event.body;
                var result = ignoredPrefix.filter(option => ttb.startsWith(option.name));
                if (ttb.startsWith(result)) {
                    log("blocked " + result);
                    return;
                }
            }*/
        }

        if ((event.type == "message" || event.type == "message_reply")) {

        let input = event.body;
        let query = formatQuery(input.replace(/\s+/g, ''));
        let query2 = formatQuery(input);
            if (isMyId(event.senderID)) {
                if (query == "stop") {
                    sendMessage(true, api, event, "Goodbye...");
                    settings.isStop = true;
                    return;
                } else if (query == "resume") {
                    sendMessage(true, api, event, "Hi i am back!");
                    settings.isStop = false;
                    return;
                } else if (query == "restart") {
                    fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
                    fs.writeFileSync(__dirname + "/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
                    fs.writeFileSync(__dirname + "/group.json", JSON.stringify(group), "utf8");
                    sendMessage(true, api, event, "Restarting program...");
                    setTimeout(function () {
                        let rs = [];
                        rs.push(event.threadID);
                        rs.push(event.messageID);
                        fs.writeFileSync(__dirname + "/restart.json", JSON.stringify(rs), "utf8");
                        process.on("exit", function () {
                            require("child_process").spawn(process.argv.shift(), process.argv, {
                                cwd: process.cwd(),
                                detached : true,
                                stdio: "inherit"
                            });
                        });
                        process.exit();
                    }, 3000);
                }
            }
            if (!(adm.includes(event.senderID))) {
                if (settings.crash) {
                    if (isMyPrefix(input, query, query2)) {
                    if (isGoingToFastCallingTheCommand(event)) {
                        return;
                    }
                    let message = {
                        body: "An internal issue has been detected the system is automatically placed under maintenance mode.",
                        attachment: fs.createReadStream(__dirname + '/assets/maintenance.jpg')
                    };
                    sendMessage(true, api, event, message);
                }
                    return;
                } else if (settings.isDebugEnabled) {
                    if (isMyPrefix(input, query, query2)) {
                    if (isGoingToFastCallingTheCommand(event)) {
                        return;
                    }
                    let message = {
                        body: "Hold on a moment this system is currently under maintenance...I will be right back in few moments.",
                        attachment: fs.createReadStream(__dirname + '/assets/maintenance.jpg')
                    };
                    sendMessage(true, api, event, message);
                }
                    return;
                } 
            } else if (settings.isStop) {
                return;
            }
        }

        if (!group.toString().includes(event.threadID)) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup && !group.toString().includes(event.threadID)) {
                    group.push(event.threadID + ":" + gc.threadName);
                    log("new_group " + event.threadID);
                }
            });
        }

        if (!(restart[0] === undefined && restart[1] === undefined) && isCalled) {
            api.sendMessage("Successfully restarted", restart[0], restart[1]);
            let rs = [];
            fs.writeFileSync(__dirname + "/restart.json", JSON.stringify(rs), "utf8");
            isCalled = false;
        }
        
        switch (event.type) {
            case "message":
                saveEvent(event);
                ai(api, event, event.body);
                break;
            case "message_reply":
                saveEvent(event);
                ai(api, event, event.body);
                ai22(api, event, event.body);
                break;
            case "message_unsend":
                if (adm.includes(event.senderID)) {
                    break;
                }
                let d = msgs[event.messageID];
                if (d === undefined) {
                    log("unsend_undefined " + event.messageID);
                    break;
                }
                unsend_msgs[event.messageID] = d;
                let time = getTimestamp();
                api.getUserInfo(event.senderID, (err, data) => {
                    if (err) return log(err);
                    if (d[0] == "photo") {
                        unsendPhoto(api, event, d, data);
                    } else if (d[0] == "animated_images") {
                        unsendGif(api, event, d, data);
                    } else if (d[0] == "share") {   
                        let filename = __dirname + '/cache/images/unsend_share_' + time + '.png'
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][3], function(gifResponse) {
                            gifResponse.pipe(file);
                            file.on('finish', function() {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let time = getTimestamp();
                                    api.getThreadInfo(event.threadID, (err, gc) => {
                                        if (err) return log(err);
                                        if (gc.isGroup) {
                                            let message = {
                                                body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[1][2],
                                                attachment: fs.createReadStream(filename),
                                                mentions: [{
                                                    tag: '@' + data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0
                                                }]
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_share_group " + d[1][0] + " " + filename);
                                        } else {
                                            let message = {
                                                body: "You deleted this url.\n\n" + d[1][2],
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_share " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "file") {  
                        let filename = __dirname + '/cache/files/' + d[1][2];
                        let file = fs.createWriteStream(filename);
                        let fileurl = d[1][3].replace("https://l.facebook.com/l.php?u=", "");
                        let decodeurl = decodeURIComponent(fileurl);
                        let fileRequest = http.get(decodeurl, function(fileResponse) {
                            fileResponse.pipe(file);
                            file.on('finish', function() {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let time = getTimestamp();
                                    api.getThreadInfo(event.threadID, (err, gc) => {
                                        if (err) return log(err);
                                        if (gc.isGroup) {
                                            let constructMMM = "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                            if (!(d[1][4] === undefined)) {
                                                constructMMM += d[1][4];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename),
                                                mentions: [{
                                                    tag: '@' + data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0
                                                }]
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_file_group " + d[1][0] + " " + filename);
                                        } else {
                                            let constructMMM = "You deleted this file.\n";
                                            if (!(d[1][4] === undefined)) {
                                                constructMMM += d[1][4];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_file " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "location") {
                        sendMessageOnly(true, api, event, "Unsupported action. Please wait a while.");
                    } else if (d[0] == "sticker") {
                        let filename = __dirname + '/cache/images/unsend_sticker_' + time + '.png';
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][2], function(gifResponse) {
                            gifResponse.pipe(file);
                            file.on('finish', function() {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let time = getTimestamp();
                                    api.getThreadInfo(event.threadID, (err, gc) => {
                                        if (err) return log(err);
                                        if (gc.isGroup) {
                                            let constructMMM = "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename),
                                                mentions: [{
                                                    tag: '@' + data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0
                                                }]
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_sticker_group " + d[1][0] + " " + filename);
                                        } else {
                                            let constructMMM = "You deleted this sticker.\n"
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_sticker " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "video") {
                        let filename = __dirname + '/cache/videos/unsend_video_' + time + '.mp4'
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][2], function(gifResponse) {
                            gifResponse.pipe(file);
                            file.on('finish', function() {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let time = getTimestamp();
                                    api.getThreadInfo(event.threadID, (err, gc) => {
                                        if (err) return log(err);
                                        if (gc.isGroup) {
                                            let constructMMM = "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename),
                                                mentions: [{
                                                    tag: '@' + data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0
                                                }]
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_video_group " + d[1][0] + " " + filename);
                                        } else {
                                            let constructMMM = "You deleted this video.\n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_video " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "audio") {
                        let filename = __dirname + '/cache/audios/unsend_audio_' + time + '.mp3'
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][2], function(gifResponse) {
                            gifResponse.pipe(file);
                            file.on('finish', function() {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let time = getTimestamp();
                                    api.getThreadInfo(event.threadID, (err, gc) => {
                                        if (err) return log(err);
                                        if (gc.isGroup) {
                                            let constructMMM = "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename),
                                                mentions: [{
                                                    tag: '@' + data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0
                                                }]
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_audio_group " + d[1][0] + " " + filename);
                                        } else {
                                            let constructMMM = "You deleted this voice message.\n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                                            let message = {
                                                body: constructMMM,
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(true, api, event, message);
                                            log("unsend_audio " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return log(err);
                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                api.getThreadInfo(event.threadID, (err, gc) => {
                                    if (err) return log(err);
                                    if (gc.isGroup) {
                                        let message = {
                                            body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[2],
                                            mentions: [{
                                                tag: '@' + data[event.senderID]['name'],
                                                id: event.senderID,
                                                fromIndex: 0
                                            }]
                                        }
                                        sendMessageOnly(true, api, event, message);
                                        log("unsend_message_group " + d[0] + " " + message);
                                    } else {
                                        let message = "You deleted the following.\n\n" + d[2];
                                        sendMessageOnly(true, api, event, message);
                                        log("unsend_message " + d[0] + " " + message);
                                    }
                                });
                            }
                        });
                    }
                });
                break;
            case "event":
                switch (event.logMessageType) {
                    case "log:subscribe":
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) return log(err);
                            if (gc.isGroup) {
                                let gname = gc.threadName;
                                let i = 0;
                                let names = [];
                                while (true) {
                                    if (event.logMessageData.addedParticipants[i] === undefined) {
                                        break;
                                    }
                                    if (event.logMessageData.addedParticipants[i].userFbId != getMyId()) {
                                        names.push([event.logMessageData.addedParticipants[i].userFbId, event.logMessageData.addedParticipants[i].fullName]);
                                    } else {
                                        sendMessageOnly("Hello! Thank you for adding me on this group. Do you want to enable ChatBot AI features on this group or not? In default, it's enabled.");
                                    }
                                    i++;
                                }
                                let gret;
                                if (i > 1) {
                                    gret = "Welcome ";
                                    for (let a = 0; a < names.length; a++) {
                                        if (a == names.length - 1) {
                                            gret += "and @" + names[a][1] + " ";
                                        } else {
                                            gret += "@" + names[a][1] + ", ";
                                        }
                                        log("new_member_multi " + names[a][0] + " " + names[a][1])
                                    }
                                    gret += ". How are you all?\n\n" + itbody;
                                } else {
                                    gret = "Welcome @" + names[0][1] + ". How are you?\n\n" + itbody;
                                    log("new_member " + names[0][0] + " " + names[0][1])
                                }
                                let name = event.logMessageData.addedParticipants[0].fullName;
                                let id = event.logMessageData.addedParticipants[0].userFbId;
                                let arr = gc.participantIDs;
                                welcomeUser(api, event, name, gname, arr.length, id, gret);
                            }
                        })
                        break;
                    case "log:unsubscribe":
                        let id = event.logMessageData.leftParticipantFbId;
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) log(err);
                            api.getUserInfo(parseInt(id), (err, data) => {
                                if (err) return log(err);
                                for (let prop in data) { 
                                    if (data.hasOwnProperty(prop) && data[prop].name) {
                                        let gcn = gc.threadName;
                                        let arr = gc.participantIDs;
                                        if (settings.antiLeave) {
                                            api.addUserToGroup(prop, event.threadID, (err) => {
                                                if (err) log(err);
                                                log("add_user " + event.threadID + " " + prop);
                                            });
                                        }
                                        byebyeUser(api, event, data[prop].name, gcn, arr.length, prop);
                                    }
                                }
                            })
                        })
                        break;
                    case "log:thread-name":
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return log(err);
                            let constructMMM = "@" + data[event.senderID]['name'] + " has changed the groupname to " + event.logMessageData.name;
                            if (group.toString().includes(event.threadID)) {
                                for (b in group) {
                                    if (b.startsWith(event.threadID)) {
                                        constructMMM = "@" + data[event.senderID]['name'] + " has changed the groupname from " + b.split(":")[1] + "to " + event.logMessageData.name;
                                    }
                                }
                            }
                            let message = {
                                body: constructMMM,
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }]
                            }
                            sendMessage(true, api, event, message);
                        });
                        break;
                    case "log:user-nickname":
                        sendMessage(true, api, event, JSON.stringify(event.logMessageData));
                        break;
                }
                break;
        }
    });
});

function wait(ms) {
    return new Promise((resolve) => {
        log("wait_timeout >> " + ms);
        setTimeout(resolve, ms);
    });
}

async function ai22(api, event, input) {
                let query = formatQuery(input.replace(/\s+/g, ''));
                let query2 = formatQuery(input);
                if (input == ".") {
                    if (event.messageReply.body != "") {
                      if (input.startsWith("_")) {
                        input = input.slice(1);
                      }
                        ai(api, event, event.messageReply.body);
                    }
                } else if (query == "notify") {
                    if (isMyId(event.senderID)) {
                        if (event.messageReply.body == "") {
                            sendMessage(true, api, event, "You need to reply notify to a message which is not empty to notify it to all group chats.");
                        } else {
                            sendMessageToAll(api, event.messageReply.body);
                        }
                    }
                } else if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                    if (adm.includes(event.senderID)) {
                        if (event.messageReply.senderID != getMyId()) {
                            sendMessage(true, api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
                        } else {
                            api.unsendMessage(event.messageReply.messageID, (err) => {
                                if (err) log(err);
                            });
                        }
                    }
                } else if (query == "pinadd") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(true, api, event, "You need to reply pin add to a message which is not empty to pin it.");
                    } else {
                        pinned.pin.message[event.threadID] = event.messageReply.body
                        pinned.pin.sender[event.threadID] = event.messageReply.senderID
                        sendMessage(true, api, event, "Message pinned.. Enter \"pin\" to show it.");
                        fs.writeFileSync(__dirname + "/pinned.json", JSON.stringify(pinned), "utf8")
                    }
                } else if (query == "count") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(true, api, event, "You need to reply count to a message.");
                    } else {
                        sendMessage(true, api, event, "The words on this message is about " + countWords(event.messageReply.body) + ".");
                    }
                } else if (query == "countvowels") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(true, api, event, "You need to reply count --vowels to a message.");
                    } else {
                        sendMessage(true, api, event, "The vowels on this message is about " + countVowel(event.messageReply.body) + ".");
                    }
                } else if (query == "countconsonants") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(true, api, event, "You need to reply count --consonants to a message.");
                    } else {
                        sendMessage(true, api, event, "The consonants on this message is about " + countConsonants(event.messageReply.body) + ".");
                    }
                } else if (query.startsWith("wfind")) {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    let data = input.split(" ");
                    if (data.length < 2) {
                        sendMessage(true, api, event, "Opps! I didnt get it. You should try using wfind text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwfind my name")
                    } else {
                        data.shift();
                        let se = data.join(" ");
                        if (event.messageReply.body == "") {
                            sendMessage(true, api, event, "You need to reply wfind text to a message.");
                        } else if (event.messageReply.body.includes(se)) {
                            sendMessage(true, api, event, "I found the \"" + se + "\" on this message " + (se.split(se).length - 1) + " times.");
                        } else {
                            sendMessage(true, api, event, "I cannot found any apperance of your search term on the message.");
                        }
                    }
                } else if (query == "bgremove") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                        if (event.messageReply.attachments.length < 1) {
                            sendMessage(true, api, event, "I cannot see an image. Please reply bgremove to an image.");
                        } else if (event.messageReply.attachments.length > 1) {
                            sendMessage(true, api, event, "Opps! I cannot remove all of the images background at the same time. Please select only one image.");
                        } else if ((event.messageReply.attachments.length === 1) && (event.messageReply.attachments[0].type == 'photo')) {
                            const url = event.messageReply.attachments[0].url;
                            request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/removebg.png')).on('finish', () => {
                                const inputPath = './cache/images/removebg.png';
                                const formData = new FormData();
                                formData.append('size', 'auto');
                                formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
        
                                axios({
                                        method: 'post',
                                        url: 'https://api.remove.bg/v1.0/removebg',
                                        data: formData,
                                        responseType: 'arraybuffer',
                                        headers: {
                                            ...formData.getHeaders(),
                                            'X-Api-Key': 'UB8WrY6YRzeeZDTsxv9NYQ9C',
                                        },
                                        encoding: null
                                    })
                                    .then((res) => {
                                        if (res.status != 200) return
                                        console.error('Error:', res.status, res.statusText);
                                        fs.writeFileSync("./cache/images/removebg.png", res.data);
                                        let message = {
                                            attachment: fs.createReadStream(__dirname + "/cache/images/removebg.png")
                                        }
                                        sendMessage(true, api, event, message);
                                        unLink(__dirname + "/cache/images/removebg.png");
                                    })
                                    .catch((error) => {
                                        sendMessage(true, api, event, "An unknown error as been occured. Please try again later.");
                                        return log(err);
                                    });
                            })
                        }
                    } else {
                        sendMessage(true, api, event, "Hold on... There is still a request in progress.");
                    }
                } else if (query == "gphoto") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    api.getThreadInfo(event.threadID, (err, gc) => {
                        if (err) return log(err);
                        if (gc.isGroup) {
                            if (event.messageReply.attachments.length < 1) {
                                sendMessage(true, api, event, "I cannot see an image. Please reply gphoto to an image.");
                            } else if (event.messageReply.attachments.length > 1) {
                                sendMessage(true, api, event, "Opps! I cannot set this all as group photo. Please select only one image.");
                            } else if ((event.messageReply.attachments.length === 1) && (event.messageReply.attachments[0].type == 'photo')) {
                                const url = event.messageReply.attachments[0].url;
                                let time = getTimestamp();
                                request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/gphoto_' + time + '.png')).on('finish', () => {
                                    api.changeGroupImage(fs.createReadStream(__dirname + '/cache/images/gphoto_' + time + '.png'), event.threadID, (err) => {
                                        if (err) return log(err);
                                    });
                                    unLink(__dirname + '/cache/images/gphoto.png_' + time + '');
                                })
                            }
                        } else {
                            sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    });
                }
}

async function ai(api, event, input) {
    let query = formatQuery(input.replace(/\s+/g, ''));
    let query2 = formatQuery(input);
    if (nsfw(query)) {
        let message = {
            attachment: fs.createReadStream(__dirname + '/assets/fbi/fbi_' + Math.floor(Math.random() * 4) + '.jpg')
        };
        sendMessage(true, api, event, message);
        return;
    }
    if (!input.replace(pictographic, '').length) {
        if (!isGoingToFastResendingOfEmo(event)) {
            await wait(5000);
            sendMessageOnly(true, api, event, input);
            return;
        }
    }
    reaction(api, event, query, input);
    if (event.type == "message_reply" && event.messageReply.senderID != getMyId()) {
        return;
    }
    if (event.type == "message") {
        if (query == "bgremove" || query == "gphoto") {
            sendMessage(true, api, event, "You need to reply to an image in order to work.");
        } else if (query == "count") {
            sendMessage(true, api, event, "You need to reply to a message to count its words.");
        } else if (query == "countvowels") {
            sendMessage(true, api, event, "You need to reply to a message to count its vowels.");
        } else if (query == "countconsonants") {
            sendMessage(true, api, event, "You need to reply to a message to count its consonants.");
        } else if (query.startsWith("wfind")) {
            sendMessage(true, api, event, "You need to reply to a message to find a word from a message.");
        } else if (query == "pinadd") {
            sendMessage(true, api, event, "You need to reply to a message to pin a message.");
        } else if (query == "remove" || query == "unsent" || query == "delete" || query == "unsend") {
            sendMessage(true, api, event, "You need to reply to my message to unsend it.");
        }
    }
    if (query.startsWith("searchimg")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using searchimg text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsearchimg melvin jones repol")
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                let imgtext = input.substring(10);
                let client = new GoogleImages('a2fab60364a8448d4', 'AIzaSyBSajn0E5NNIMFG1oMk6AXlRwHTPgnW_m8');
                client.search(imgtext).then(images => {
                    getImages(api, event, images);
                });
            } else {
                sendMessage(true, api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("searchincog")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using searchincog text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsearchincog Who is Melvin Jones Repol")
        } else {
            data.shift()
            getResponseData('https://api.duckduckgo.com/?q=' + data.join(" ") + '&format=json&pretty=1').then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    log(JSON.stringify(response));
                    sendMessage(true, api, event, response.Abstract);
                }
            });
        }
    } else if (isMyPrefix(input, query, query2)) {

            if (isGoingToFast(api, event)) {
                return;
            }
        
        if ((settings.prefix != "" && input == settings.prefix) || query == "mj" || query == "repol" || query == "mrepol742" || query == "melvinjonesrepol" || query == "melvinjones") {
            if (!nonRRR.includes(event.senderID)) {
                let message = {
                    body: itbody,
                    attachment: [fs.createReadStream(__dirname + "/assets/mrepol742.png")]
                }
                sendMessage(true, api, event, message);
                nonRRR.push(event.senderID);
                fs.writeFileSync(__dirname + "/users.json", JSON.stringify(nonRRR), "utf8");
            } else {
                sendMessage(true, api, event, hey[Math.floor(Math.random() * hey.length)]);
            }
        } else {
            let text = query2;
            if (query.startsWith("repol")) {
                text = input.substring(6)
            } else if (query.startsWith("mrepol742")) {
                text = input.substring(10)
            } else if (query.startsWith("mj")) {
                text = input.substring(3)
            } else if (query.startsWith("melvinjonesrepol")) {
                text = input.substring(19)
            } else if (query.startsWith("melvinjonesgallanorepol")) {
                text = input.substring(28)
            } else if (query.startsWith("melvinjones")) {
                text = input.substring(13)
            } else if (query.startsWith("gencode")) {
                text = input.substring(8)
            } else if (query.startsWith("search")) {
                text = input.substring(7)
            } else if (input.startsWith(settings.prefix)) {
                text = input.substring(settings.prefix.length);
            }
            let text1 = formatQuery(text.replace(/\s+/g, ''));
            let text2 = formatQuery(text);
            if (/^[0-9]+$/.test(input.replace(/\s+/g, '').toLowerCase())) {
                sendMessage(true, api, event, "What do you want me to do with " + input + "?");
            } else if (!/[a-z0-9]/gi.test(text1)) {
                sendMessage(true, api, event, "Hmmmmm... Seems like i cannot understand what do you mean by that...");
            } else if (nsfw(text1)) {
                sendMessage(true, api, event, "Shhhhhhh watch your mouth.");
            } else if (text1.startsWith("whatiswebvium")) {
                sendMessage(true, api, event, "Webvium is a web browser for android and supported devices. It's fast, lightweight and comes with amazing features consider its app size is so low. It was created from scratch without dependencies, a web browser you haven't seen before.");
            } else if (text1.startsWith("whocreatedwebvium")) {
                sendMessage(true, api, event, "Melvin Jones Repol created the Project Webvium on Oct of 2018.");
            } else if (text1.startsWith("whoareyou") || text1.startsWith("whatisyourname")) {
                sendMessage(true, api, event, "I'm Mj.");
            } else if (text1.startsWith("whoisactive")) {
                sendMessage(true, api, event, "Me");
            } else if (text1 == "sim") {
                sendMessage(true, api, event, "Me? noooo...");
            } else if (text1 == "callme") {
                let id;
                if ((event.type == "message_reply" && event.senderID != getMyId())) {
                    id = event.messageReply.senderID;
                } else if (event.type == "message") {
                    id = event.senderID;
                }
                api.getUserInfo(id, (err, info) => {
                    if (err) return log(err);
                    let name = info[id]['name'];
                    let message = {
                        body: "Yes " + name + "?",
                        mentions: [{
                            tag: '@' + name,
                            id: id,
                            fromIndex: 0
                        }]
                    };
                    sendMessage(true, api, event, message);
                });
            } else if (text1 == "whoami" || text1 == "whatsmyname" || text1 == "whoiam" || text1 == "iamcalled" || text1 == "theycallme" || text1 == "iamknownas" || text1 == "mynameis" || text1 == "doyouknowme" || text1 == "whatismyname") {
                let id;
                if ((event.type == "message_reply" && event.senderID != getMyId())) {
                    id = event.messageReply.senderID;
                } else if (event.type == "message") {
                    id = event.senderID;
                }
                api.getUserInfo(id, (err, info) => {
                    if (err) return log(err);
                    let name = info[id]['name'];
                    let time = getTimestamp();
                    request(encodeURI(getProfilePicFullHD(id))).pipe(fs.createWriteStream(__dirname + '/cache/images/whoiam_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: "You're " + name,
                                attachment: fs.createReadStream(__dirname + '/cache/images/whoiam_' + time + '.png'),
                                mentions: [{
                                    tag: '@' + name,
                                    id: id,
                                    fromIndex: 0
                                }]
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/whoiam_" + time + ".png");
                        })
                });
            } else if (text1 == "whoownyou") {
                sendMessage(true, api, event, "Melvin Jones Repol.")
            } else if (text1.startsWith("whomadeyou") || text1.startsWith("whocreatedyou") || text1.startsWith("whoisyourowner") || text1.startsWith("whowroteyou") || text1.startsWith("whoisyourmaker") || text1.startsWith("whobuiltyou") || text1.startsWith("whoprogramyou")) {
                sendMessage(true, api, event, "Melvin Jones Repol created me.");
            } else if (text1.startsWith("howoldareyou") || text1.startsWith("howyoungareyou") || text1.startsWith("whatisyourage") || text1.startsWith("whatsyourage")) {
                sendMessage(true, api, event, "I'm 20 years old.");
            } else if (text1.startsWith("whereyoufrom") || text1.startsWith("whereareyoufrom") || text1.startsWith("wheredoyoufrom")) {
                sendMessage(true, api, event, "Somewhere in the place they called the Philippines.");
            } else if (text1.startsWith("areyouhuman") || text1.startsWith("areyoubot") || text1.startsWith("areyouthebot")) {
                sendMessage(true, api, event, "Scientifically, Programmatically and Technologically Human.");
            } else if (text1 == "dumb" || text1 == "dick" || text1 == "pussy" || text1 == "fuckyou" || text1 == "damnyou" || text1 == "fyou" || text1 == "fckyou") {
                sendMessage(true, api, event, "I'm far intelligent than you human(s).");
            } else if (text1 == "bot" || text1 == "ai" || text1 == "robot") {
                sendMessage(true, api, event, "Who are you to call me that!.")
            } else if (text1.startsWith("areyoumj")) {
                sendMessage(true, api, event, "Yes i am indeed Mj.");
            } else if (text1 == "thank" || text1 == "thankyou" || text1 == "thanksbro" || text1 == "thanks" || text1.startsWith("ilikeyou")) {
                sendMessage(true, api, event, "You're welcome.");
            } else if (text1 == "whatareyou") {
                sendMessage(true, api, event, "A human.");
            } else if (text1 == "wascorrect") {
                sendMessage(true, api, event, "Yeah i knew it.");
            } else if (text1 == "bye" || text1 == "goodbye") {
                sendMessage(true, api, event, "bye bye.");
            } else if (text1 == "ok" || text1 == "okay" || text1 == "nice" || text1.startsWith("hmmm")) {
                sendMessage(true, api, event, "Yeahh..");
            } else if (text1 == "time" || text1.startsWith("whatsthetime") || text1.startsWith("whatisthetime") || 
            text1 == "todayis" || text1.startsWith("timetoday") || text1.startsWith("whatsthedatetoday") || 
            text1.startsWith("whatisthedatetoday") || text1.startsWith("whatdatetoday") || text1.startsWith("whatisthetimenow") || 
            text1.startsWith("whatsthetimenow") || text1 == "date" || text1.startsWith("whatsthedate") || text1.startsWith("whatisthedate") || 
            text1.startsWith("datetoday") || text1.startsWith("whattimeisitnow") || text1.startsWith("whatdateisitnow")) {
                sendMessage(true, api, event, "It's " + getMonth(settings.timezone) + " " + getDayN(settings.timezone) + ", " + getDay(settings.timezone) + " " + formateDate(settings.timezone));
                sendMessage(false, api, event, "To show date according to your timezone. Pleas use the `time [timezone]` command.\nFor example:\ntime Asia/Singapore");
            } else if (text1.startsWith("iloveyou") || text1.startsWith("loveme") || text1.startsWith("doyoulikeme") || text1.startsWith("doyouloveme") || text1.startsWith("whydontyouloveme") || text1.startsWith("imissyou") || text1.startsWith("iwantyou")) {
                sendMessage(true, api, event, "I've already a girl and i love her so much >3.");
            } else if (text1 == "stop" || text1 == "delete" || text1 == "shutdown" || text1 == "shutup") {
                sendMessage(true, api, event, "huhhhhhhhhh uh.");
            } else if (text1 == "melvinjonesrepol" || text1 == "mrepol742" || text1 == "melvinjones" || text1 == "melvinjonesgallanorepol" ||
                (text1.startsWith("whois") && isMe(text2))) {
                    let message = {
                        body: "Melvin Jones Gallano Repol\n\nA self taught Software Engineer with experience in Web Development, SEO, Data Analyst and Computer Troubleshooting.\nhttps://mrepol742.github.io",
                        attachment: [fs.createReadStream(__dirname + "/assets/mrepol742.png")]
                    }
                sendMessage(true, api, event, );
            } else if (text1.startsWith("whois") && (text2.includes("pat") || text2.includes("patrickelcano") || text2.includes("0x3ef8") || text2.includes("jaypatrickcano") || text2.includes("patrickcano"))) {
                let mss = "Jay Patrick Cano is a self-taught front-end developer in the Philippines. He also been involved in many back-end projects in the past. He  been learning these things for the last two years, and it feels like learning more is a part of my life.\nhttps://0x3ef8.github.io";
                sendMessage(true, api, event, mss);
            } else if (text1 == "help" || /^help[0-9]+$/.test(text1)) {
                sendMessage(true, api, event, "Do you mean cmd? You can call cmd to open my command list.");
            } else if (text1 == "cmd" || /^cmd[0-9]+$/.test(text1)) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using cmd number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncmd 2");
                //} else if (text1.split('').length < 10) {
                //    sendMessage(true, api, event, idknow[Math.floor(Math.random() * idknow.length)]);
            } else if (someR(api, event, text1) || (someA(api, event, text1, input) && !query.includes("@"))) {
                return;
            } else if (!query.startsWith("search") && (text.split(" ").length < 2 || text.indexOf(" ") == -1) && !/^[0-9]+$/.test(text1)) {
                if (repeatOfNonWWW(event)) {
                    return;
                }
                if (text1.startsWith("what")) {
                    sendMessage(true, api, event, "what is it?");
                } else if (text1.startsWith("when")) {
                    sendMessage(true, api, event, "when is the?");
                } else if (text1.startsWith("where")) {
                    sendMessage(true, api, event, "where is it?");
                } else if (text1.startsWith("how")) {
                    sendMessage(true, api, event, "how what?");
                } else if (text1.startsWith("which")) {
                    sendMessage(true, api, event, "which of the?");
                } else if (text1.endsWith("?")) {
                    sendMessage(true, api, event, text);
                } else {
                    sendMessage(true, api, event, text + "?");
                }
            } else {
                if (!text.endsWith("?") || !text.endsWith(".") || !text.endsWith("!")) {
                    text += ".";
                }
                // initiate results simulatenoesly
                let ss = await aiResponse(settings.text_complextion, text, true);
                let cw34 = countWords(ss);
                log("response " + cw34 + " " + ss);
                sendMessage(true, api, event, ss);
                if (ss.includes("browser") || ss.includes("chrome") || ss.includes("webkit") || ss.includes("KHTML")) {
                    sendMessageOnly(false, api, event, "Talking bout browsers lemme introduce my own web browser for Android devices, it's full of features and design minimalist with the size of 400KB you wouldnt even expect. Programming drive me to this try it out while it's free.\n\n⦿ Stable: https://webvium.github.io\n⦿ Beta: https://webvium.github.io/beta/\n⦿ Dev: https://mrepol742.github.io/webviumdev")
                } else if (ss.includes("VPN")) {
                    sendMessageOnly(false, api, event, "https://mrepol742.github.io/webviumvpn");
                }
            }
        }
    }
    if (event.type == "message") {
        someA(api, event, query, input);
    }
    if (event.type == "message_reply" && event.senderID != getMyId()) {
        if (!isMyId(event.messageReply.senderID)) {
            return;
        }
        someA(api, event, query, input);
    }
    if (query == "clearcache") {
      let count = 0;
      let count1 = 0;
      let count2 = 0;
      let count3 = 0;
        if (adm.includes(event.senderID)) {
            fs.readdir(__dirname + "/cache/audios/", function (err, files) {
                if (err) {
                    return log(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                      count++;
                        unLink(__dirname + "/cache/audios/" + file);
                    }
                });
            });
            fs.readdir(__dirname + "/cache/images/", function (err, files) {
                if (err) {
                    return log(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                     count1++;
                        unLink(__dirname + "/cache/images/" + file);
                    }
                });
            });
            fs.readdir(__dirname + "/cache/videos/", function (err, files) {
                if (err) {
                    return log(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                      count2++;
                        unLink(__dirname + "/cache/videos/" + file);
                    }
                });
            });
            fs.readdir(__dirname + "/cache/files/", function (err, files) {
                if (err) {
                    return log(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                      count3++;
                        unLink(__dirname + "/cache/files/" + file);
                    }
                });
            });
            threadIdMV = {};
             await wait(2000);
let message = `
_______  Cache  _______
|
|   ⦿ Cache 0: ` + count + ` file(s)
|   ⦿ Cache 1: `  + count1 + ` file(s)
|   ⦿ Cache 2: ` + count2 + ` file(s)
|   ⦿ Cache 3: ` + count3 + ` file(s)
|   ⦿ Buffer: ` + (Object.keys(threadIdMV).length) + `
|______________________
`;
            sendMessage(true, api, event, message);
        }
    } else if (query == "debugon") {
        if (adm.includes(event.senderID)) {
            settings.isDebugEnabled = true;
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Debug mode enabled.");
        }
    } else if (query == "debugoff") {
        if (adm.includes(event.senderID)) {
            settings.isDebugEnabled = false;
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Konnichiwa i am back.");
        }
    }
    if (query.startsWith("ttsjap")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using ttsjap text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nttsjap I am melvin jones repol")
        } else {
            try {
                data.shift();
                let responses = "https://texttospeech.responsivevoice.org/v1/text:synthesize?text=" + encodeURIComponent(data.join(" ")) + "&lang=ja&engine=g1&rate=0.5&key=9zqZlnIm&gender=female&pitch=0.5&volume=1";
                let time = getTimestamp();
                var file = fs.createWriteStream(__dirname + "/cache/audios/ttsjap_" + time + ".mp3");
                var gifRequest = http.get(responses, function(gifResponse) {
                    gifResponse.pipe(file);
                    file.on('finish', function() {
                        log("Finish downloading audio file.");
                        var message = {
                            attachment: fs.createReadStream(__dirname + "/cache/audios/ttsjap_" + time + ".mp3")
                                .on("end", async () => {
                                    if (fs.existsSync(__dirname + "/cache/audios/ttsjap_" + time + ".mp3")) {
                                        unLink(__dirname + "/cache/audios/ttsjap_" + time + ".mp3");
                                    }
                                })
                        }
                        sendMessage(true, api, event, message);
                    });
                });
            } catch {
                sendMessage(true, api, event, "Unfortunately an error occured,");
            }
        }
    } else if (query2.startsWith("tts ") || query2.startsWith("say ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using tts text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntts I am melvin jones repol")
        } else {
            data.shift();
            const url = googleTTS.getAudioUrl(data.join(" "), {
                lang: 'en',
                slow: false,
                host: 'https://translate.google.com',
            });
            let time = getTimestamp();
            request(url).pipe(fs.createWriteStream(__dirname + '/cache/audios/tts_' + time + '.mp3'))

                .on('finish', () => {
                    let message = {
                        attachment: fs.createReadStream(__dirname + '/cache/audios/tts_' + time + '.mp3'),
                    };
                    sendMessage(true, api, event, message);
                    unLink(__dirname + "/cache/audios/tts_" + time + ".mp3");
                })
        }
    } else if (query == "stats") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let message = `
_______  Statistics  _______
|
|   ⦿ Messages: ` + numberWithCommas(Object.keys(msgs).length) + `
|   ⦿ Unsend Messages: ` + numberWithCommas(Object.keys(unsend_msgs).length) + `
|   ⦿ Users: ` + numberWithCommas(nonRRR.length) + `
|   ⦿ Groups: ` + group.length + `
|   ⦿ Block Users: ` + blockRRR.length + `
|   ⦿ Block Groups: ` + blockSSS.length + `
|   ⦿ Muted Users: ` + mutedRRR.length + `
|___________________________
`;
        sendMessage(true, api, event, message);
    } else if (query == "uptime") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let second_process = process_p.uptime();
        let seconds_con = secondsToTime(second_process);
let message = `
_______  Uptime  _______
|
|   ` + seconds_con + `
|_______________________
`;
        sendMessage(true, api, event, message);
    } else if (query == "sysinfo") {
        if (isGoingToFast(api, event)) {
            return;
        }
        (async () => {
            const testNetworkSpeed = new NetworkSpeed();
            let osFreeMemm = os.freemem();
            let osFreeMem = convertBytes(osFreeMemm);
            let osTotalMemm = os.totalmem();
            let second_process = process_p.uptime();
            let seconds_con = secondsToTime(second_process);
            let osTotalMem = convertBytes(osTotalMemm);
            let baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
            let fileSizeInBytes = 500000;
            let speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
            let optionss = {
                hostname: 'www.google.com',
                port: 80,
                path: '/catchers/544b09b4599c1d0200000289',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let upload_spee = await testNetworkSpeed.checkUploadSpeed(optionss, fileSizeInBytes);
            const rss = convertBytes(process.memoryUsage().rss);
            const heapTotal = convertBytes(process.memoryUsage().heapTotal);
            const heapUsed = convertBytes(process.memoryUsage().heapUsed);
            const external = convertBytes(process.memoryUsage().external);
            const arrayBuffers = convertBytes(process.memoryUsage().arrayBuffers);
let message = `
_______  System Info  _______
|
|   ⦿ Uptime: ` + seconds_con + `
|   ⦿ RAM: ` + osFreeMem + `
|   ⦿ ROM: ` + osTotalMem + `
|   ⦿ Download Speed: ` + upload_spee.mbps + ` mbps
|   ⦿ Upload Speed: ` + speed.mbps + ` mbps
|   ⦿ RSS: ` + rss + `
|   ⦿ Heap Total: ` + heapTotal + `
|   ⦿ Heap Used: ` + heapUsed + `
|   ⦿ External: ` + external + `
|   ⦿ Array Buffers: ` + arrayBuffers + `
|   ⦿ Save State: ` + messagesD + `
|   ⦿ Fb State: ` + fb_stateD + `
|_____________________________
`;
            sendMessage(true, api, event, message);
        })();
    } else if (query.startsWith("dns4")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using dns4 url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndns4 google.com")
        } else {
            data.shift();
        dns.resolve4(data.join(" "), (err, addresses) => {
            if (err) {
                log(err);
                sendMessage(true, api, event, "Houston! An error occured. Please try it again later.");
                return;
            }
            sendMessage(true, api, event, addresses);
        });
    }
    } else if (query.startsWith("dns6")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using dns6 url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndns6 google.com")
        } else {
            data.shift();
        dns.resolve6(data.join(" "), (err, addresses) => {
            if (err) {
                log(err);
                sendMessage(true, api, event, "Houston! An error occured. Please try it again later.");
                return;
            }
            sendMessage(true, api, event, addresses);
        });
    }
    } else if (query.startsWith("ping")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using ping url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nping google.com")
        } else {
try {
            data.shift();
            let hosts = ['google.com'];

            hosts.forEach(function (host) {
    ping.promise.probe(host)
        .then(function (res) {
            console.log(res);
        });
});
        } catch (a) {
            sendMessage(true, api, event, "Unfortunately an error occured please check your parameters for errors.");
        }
        }
    } else if (query2.startsWith("mean ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using mean numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmean 4 5 6 3 6 7 3 5")
        } else {
            if (!/^\d+$/.test(query.substring(4))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(5).split(" ").map(Number);
            let total = 0;
            for (let i = 0; i < arr.length; i++) {
                total += arr[i];
            }
            sendMessage(true, api, event, "The mean value is " + (total / arr.length));
        }
    } else if (query.startsWith("median")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using median numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmedian 4 5 6 3 6 7 3 5")
        } else {
            if (!/^\d+$/.test(query.substring(6))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(7).split(" ").map(Number);
            let length = arr.length;
            arr.sort((a, b) => a - b);
            if (length % 2 === 0) {
                sendMessage(true, api, event, "The median value is " + ((arr[length / 2 - 1] + arr[length / 2]) / 2));
                return;
            }
            sendMessage(true, api, event, "The median value is " + (arr[(length - 1) / 2]));
        }
    } else if (query2.startsWith("mode ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using mode numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmode 4 5 6 3 6 7 3 5")
        } else {
            if (!/^\d+$/.test(query.substring(4))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(5).split(" ").map(Number);

            const mode = {};
            let max = 0,
                count = 0;
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (mode[item]) {
                    mode[item]++;
                } else {
                    mode[item] = 1;
                }
                if (count < mode[item]) {
                    max = item;
                    count = mode[item];
                }
            }

            sendMessage(true, api, event, "The mode value is " + max);
        }
    } else if (query.startsWith("range")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using range numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nrange 4 5 6 3 6 7 3 5")
        } else {
            if (!/^\d+$/.test(query.substring(5))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(6).split(" ").map(Number);
            arr.sort((a, b) => a - b);
            sendMessage(true, api, event, "The range value is " + [arr[0], arr[arr.length - 1]]);
        }
    } else if (query.startsWith("divisible")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using divisible number number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndivisible 5 8")
        } else {
            if (!/^\d+$/.test(query.substring(9))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(10).split(" ").map(Number);
            if (arr[0] % arr[1] == 0) {
                sendMessage(true, api, event, arr[0] + " is divisible by " + arr[1]);
            } else {
                sendMessage(true, api, event, arr[0] + " is not divisible by " + arr[1]);
            }
        }
    } else if (query.startsWith("factorial")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using factorial number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfactorial 5")
        } else {
            if (!/^\d+$/.test(query.substring(9))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let num = parseInt(input.substring(10));
            sendMessage(true, api, event, "The factorial of " + num + " is " + factorial(num));
        }
    } else if (query.startsWith("findgcd")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using findGCD number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfindGCD 5")
        } else {
            if (!/^\d+$/.test(query.substring(7))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let num = parseInt(input.substring(8));
            sendMessage(true, api, event, "The GCD of " + num + " is " + findGCD(num));
        }
    } else if (query2.startsWith("roi ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using roi revenue cost instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nroi 23000 6000")
        } else {
            let revenue = input.split(" ")[1];
            let cost = input.split(" ")[2];
            let calcu = (revenue - cost) / cost;
            sendMessage(true, api, event, "The return of investment is " + calcu);
        }
    } else if (query.startsWith("cdfnormal")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using cdfnormal x μ σ instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncdfnormal 5 30 25")
        } else {
            if (!/^\d+$/.test(query.substring(9))) {
                sendMessage(true, api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.split(" ").map(Number);
            sendMessage(true, api, event, "The normal distribution is " + cdfNormal(arr[1], arr[2], arr[3]));
        }
    } else if (query.startsWith("problem")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using problem equation instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nproblem 5*5/9")
        } else {
            let text = input;
            text = text.substring(8)
            if (text.includes("√")) {
                let res;
                try {
                    res = await Math.sqrt(text.replace(/√/gi, ""));
                } catch (err) {
                    res = "You enter an invalid token in the equation. Please try it again.";
                }
                sendMessage(true, api, event, res + "");
            } else {
                let res;
                try {
                    res = await eval(text);
                } catch (err) {
                    res = "You enter an invalid token in the equation. Please try it again.";
                }
                sendMessage(true, api, event, res + "");
            }
        }
    }
    if (query.startsWith("urlshort")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using linkshort url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlink https://mrepol742.github.io")
        } else {
            let text = input.substring(9)
            let encodedParams = new URLSearchParams();
            encodedParams.append("url", text);
            let options = {
                method: 'POST',
                url: 'https://url-shortener-service.p.rapidapi.com/shorten',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com',
                    'X-RapidAPI-Key': '04357fb2e1msh4dbe5919dc38cccp172823jsna0869f87acc3'
                },
                data: encodedParams
            };
            await axios.request(options).then(function({
                data
            }) {
                sendMessage(true, api, event, data.result_url);
            }).catch(function(error) {
                log(error);
                sendMessage(true, api, event, "An unknown error as been occured. Please try again later.")
            });
        }
    } else if (query.startsWith("phub") || query.startsWith("pornhub")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let id;
        if (event.type == "message") {
            id = event.senderID;
        } else {
            if (isMyId(event.messageReply.senderID)) {
                id = event.senderID;
            } else {
                id = event.messageReply.senderID;
            }
        }
        api.getUserInfo(id, (err, info) => {
            if (err) return log(err);
            let name = info[id]['name'];
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using phub text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nphub why i am here again.");
            } else {
                data.shift()
                let phublink = 'https://manhict.tech/api/phubcmt?text=' + data.join(" ") + '&uid=' + id + '&name=' + name + '&apikey=' + keys.manhict;
                parseImage(api, event, phublink, __dirname + "/cache/images/phubmeme_" + getTimestamp() + ".jpg");
            }

        })
    } else if (query.startsWith("videolyric")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using videolyric text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideolyric In The End by Linkin Park")
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                let vdName = data.join(" ");
                const youtube = await new Innertube();
                const search = await youtube.search(vdName);
                if (search.videos[0] === undefined) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using videolyric text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideolyric In The End by Linkin Park")
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function() {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: 'mp4',
                        quality: '480p',
                        type: 'videoandaudio',
                        bitrate: '2500',
                        audioQuality: 'highest',
                        loudnessDB: '20',
                        audioBitrate: '550',
                        fps: '30'
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + '/cache/videos/video_' + time + '.mp4'));

                    stream.on('start', () => {
                        threadIdMV[event.threadID] = false;
                        log("Starting download of video file.");
                    });
                    stream.on('info', (info) => {
                        threadIdMV[event.threadID] = false;
                        log("downloading " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on('end', () => {
                        let limit = 25 * 1024 * 1024;
                        fs.readFile(__dirname + '/cache/videos/video_' + time + '.mp4', function(err, data) {
                            if (err) log(err)
                            if (data.length > limit) {
                                log("Unable to upload the video to the file limit. The file size is " + (data.length / 1024 / 1024));
                                sendMessage(true, api, event, "Unfortunately i cannot send your video due to the size restrictions on messenger platform.");
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + '/cache/videos/video_' + time + '.mp4')
                            } else {
                                log("Done.");

                                getResponseData("https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=" + vdName).then((response) => {
                                    if (response == null) {
                                        sendMessage(true, api, event, "Seems like there was an internal problem.");
                                    } else {
                                        let title = response.result.s_title;
                                        let image = response.result.s_image;
                                        let artist = response.result.s_artist;
                                        let lyrics = response.result.s_lyrics;
                                        let message = {
                                            body: title + " by " + artist + "\n\n" + lyrics.replace(/ *\[[^\]]*] */g, '').replaceAll("\n\n", "\n"),
                                            attachment: fs.createReadStream(__dirname + '/cache/videos/video_' + time + '.mp4')
                                        };
                                        sendMessage(true, api, event, message);
                                    }
                                    threadIdMV[event.threadID] = true;
                                    unLink(__dirname + '/cache/videos/video_' + time + '.mp4')
                                });
                            }
                        })
                    });
                    stream.on('error', (err) => log(err));
                }
            } else {
                sendMessage(true, api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("video")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using video text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideo In The End by Linkin Park")
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                const youtube = await new Innertube();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using video text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideo In The End by Linkin Park")
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function() {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: 'mp4',
                        quality: '480p',
                        type: 'videoandaudio',
                        bitrate: '2500',
                        audioQuality: 'highest',
                        loudnessDB: '20',
                        audioBitrate: '550',
                        fps: '30'
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + '/cache/videos/video_' + time + '.mp4'));

                    stream.on('start', () => {
                        threadIdMV[event.threadID] = false;
                        log("Starting download of video file.");
                    });
                    stream.on('info', (info) => {
                        threadIdMV[event.threadID] = false;
                        log("downloading " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on('end', () => {
                        let limit = 25 * 1024 * 1024;
                        fs.readFile(__dirname + '/cache/videos/video_' + time + '.mp4', function(err, data) {
                            if (err) log(err)
                            if (data.length > limit) {
                                log("Unable to upload the video to the file limit. The file size is " + (data.length / 1024 / 1024));
                                sendMessage(true, api, event, "Unfortunately i cannot send your video due to the size restrictions on messenger platform.");
                            } else {
                                log("Done.");
                                let message = {
                                    body: search.videos[0].title,
                                    attachment: fs.createReadStream(__dirname + '/cache/videos/video_' + time + '.mp4')
                                }
                                sendMessage(true, api, event, message);
                            }
                            threadIdMV[event.threadID] = true;
                            unLink(__dirname + '/cache/videos/video_' + time + '.mp4')
                        })
                    });
                    stream.on('error', (err) => log(err));
                }
            } else {
                sendMessage(true, api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("musiclyric")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using musiclyric text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusiclyric In The End by Linkin Park")
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                let vdName = data.join(" ");
                const youtube = await new Innertube();
                const search = await youtube.search(vdName);
                if (search.videos[0] === undefined) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using music text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusiclyric In The End by Linkin Park")
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function() {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: 'mp3',
                        bitrate: '2500',
                        audioQuality: 'highest',
                        loudnessDB: '20',
                        audioBitrate: '550'
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + '/cache/audios/music_' + time + '.mp3'));

                    stream.on('start', () => {
                        threadIdMV[event.threadID] = false;
                        log("Starting the download of music file.");
                    });
                    stream.on('info', (info) => {
                        threadIdMV[event.threadID] = false;
                        log("downloading " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on('end', () => {
                        let limit = 25 * 1024 * 1024;
                        fs.readFile(__dirname + '/cache/audios/music_' + time + '.mp3', function(err, data) {
                            if (err) log(err)
                            if (data.length > limit) {
                                log("Unable to upload the music to the file limit. The file size is " + (data.length / 1024 / 1024));
                                sendMessage(true, api, event, "Unfortunately i cannot send your music due to the size restrictions on messenger platform.");
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + '/cache/audios/music_' + time + '.mp3');
                            } else {
                                log("Finish downloading music.");


                                getResponseData("https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=" + vdName).then((response) => {
                                    if (response == null) {
                                        sendMessage(true, api, event, "Seems like there was an internal problem.");
                                    } else {
                                        let title = response.result.s_title;
                                        let image = response.result.s_image;
                                        let artist = response.result.s_artist;
                                        let lyrics = response.result.s_lyrics;
                                        let message = {
                                            body: title + " by " + artist + "\n\n" + lyrics.replace(/ *\[[^\]]*] */g, '').replaceAll("\n\n", "\n"),
                                            attachment: fs.createReadStream(__dirname + '/cache/audios/music_' + time + '.mp3')
                                        };
                                        sendMessage(true, api, event, message);
                                    }
                                    threadIdMV[event.threadID] = true;
                                    unLink(__dirname + '/cache/audios/music_' + time + '.mp3');
                                });
                            }
                        })
                    });
                    stream.on('error', (err) => log(err));
                }
            } else {
                sendMessage(true, api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("music")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using music text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusic In The End by Linkin Park")
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                const youtube = await new Innertube();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using music text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusic In The End by Linkin Park")
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function() {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: 'mp3',
                        bitrate: '2500',
                        audioQuality: 'highest',
                        loudnessDB: '20',
                        audioBitrate: '550'
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + '/cache/audios/music_' + time + '.mp3'));

                    stream.on('start', () => {
                        threadIdMV[event.threadID] = false;
                        log("Starting the download of music file.");
                    });
                    stream.on('info', (info) => {
                        threadIdMV[event.threadID] = false;
                        log("downloading " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on('end', () => {
                        let limit = 25 * 1024 * 1024;
                        fs.readFile(__dirname + '/cache/audios/music_' + time + '.mp3', function(err, data) {
                            if (err) log(err)
                            if (data.length > limit) {
                                log("Unable to upload the music to the file limit. The file size is " + (data.length / 1024 / 1024));
                                sendMessage(true, api, event, "Unfortunately i cannot send your music due to the size restrictions on messenger platform.");
                            } else {
                                log("Finish downloading music.");
                                let message = {
                                    body: search.videos[0].title,
                                    attachment: fs.createReadStream(__dirname + '/cache/audios/music_' + time + '.mp3')
                                }
                                sendMessage(true, api, event, message);
                            }
                            threadIdMV[event.threadID] = true;
                            unLink(__dirname + '/cache/audios/music_' + time + '.mp3');
                        })
                    });
                    stream.on('error', (err) => log(err));
                }
            } else {
                sendMessage(true, api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("lyrics")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using lyrics text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlyrics In The End by Linkin Park")
        } else {
            data.shift();
            let text = data.join(" ");
            getResponseData("https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=" + text).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    let title = response.result.s_title;
                    let image = response.result.s_image;
                    let artist = response.result.s_artist;
                    let lyrics = response.result.s_lyrics;
                    let time = getTimestamp();
                    request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/lyrics_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: title + " by " + artist + "\n\n" + lyrics.replace(/ *\[[^\]]*] */g, '').replaceAll("\n\n", "\n"),
                                attachment: fs.createReadStream(__dirname + '/cache/images/lyrics_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/lyrics_" + time + ".png");
                        })
                }
            });
        }
    } else if (input.startsWith("encodebinary")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using encodeBinary text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nencodeBinary fundamentals in engineering")
        } else {
            var text = input;
            text = text.substring(13)
            var Input = text;
            let output = '';
            for (var i = 0; i < Input.length; i++) {
                output += Input[i].charCodeAt(0).toString(2) + ' ';
            }
            sendMessage(true, api, event, output);
        }
    } else if (input.startsWith("decodebinary")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using decodeBinary text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndecodeBinary 01100001 01100010 01100011")
        } else {
            var text = input;
            text = text.substring(13)
            var binary = text;
            const binaryString = binary.split(' ');
            let stringOutput = '';
            for (let i = 0; i < binaryString.length; i++) {
                stringOutput += String.fromCharCode(parseInt(binaryString[i], 2));
            }
            sendMessage(true, api, event, stringOutput);
        }
    } else if (query.startsWith("encode64")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using encode64 text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nencode64 fundamentals in engineering")
        } else {
            let text = input;
            text = text.substring(9)
            let buff = Buffer.from(text);
            let base64data = buff.toString('base64');
            sendMessage(true, api, event, base64data);
        }
    } else if (query.startsWith("decode64")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using decode64 text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndecode64 ZnVuZGFtZW50YWxzIGluIGVuZ2luZWVyaW5n")
        } else {
            let text = input;
            text = text.substring(9)
            let buff = Buffer.from(text, 'base64');
            let base642text = buff.toString('ascii');
            sendMessage(true, api, event, base642text);
        }
    } else if (query.startsWith("reverse")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using reverse text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nreverse fundamentals in engineering")
        } else {
            let text = input;
            text = text.substring(8)
            let splitString = text.split("");
            let reverseArray = splitString.reverse();
            let joinArray = reverseArray.join("");
            sendMessage(true, api, event, joinArray);
        }
    } else if (query == "pinremove") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let pinned = JSON.parse(fs.readFileSync(__dirname + "/pinned.json", "utf8"));
        pinned.pin.message[event.threadID] = undefined
        pinned.pin.sender[event.threadID] = undefined
        sendMessage(true, api, event, "Pinned message removed.");
        fs.writeFileSync(__dirname + "/pinned.json", JSON.stringify(pinned), "utf8")
    } else if (query == "pin") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let pinned = JSON.parse(fs.readFileSync(__dirname + "/pinned.json", "utf8"));
        if (pinned.pin.message[event.threadID] == undefined) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    sendMessage(true, api, event, "There is no pinned message on this group chat.");
                } else {
                    sendMessage(true, api, event, "There is no pinned message on this chat.");
                }
            });
        } else {
            sendMessage(true, api, event, pinned.pin.message[event.threadID]);
        }
    } else if (query.startsWith("pdf")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using pdf text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npdf fundamentals in engineering")
        } else {
            try {
                data.shift()
                data = data.join(" ");
                let searched = data;

                let res = await pdfdrive.findEbook(searched);
                let res2 = await pdfdrive.getEbook(res[0].ebookUrl);

                sendMessage(true, api, event, res2.ebookName + "\n\n" + res2.dlUrl)
            } catch (err) {
                log(err);
                sendMessage(true, api, event, "An unknown error as been occured. Please try again later.")
            }
        }
    } else if (query.startsWith("urbandictionary") || query.startsWith("dictionary") || query2.startsWith("dict ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using dict text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndict computer");
        } else {
            let text = input.substring(17)
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
                    'X-RapidAPI-Key': apiKey[2]
                }
            };
            axios.request(options).then(function({
                data
            }) {
                let word = data.list[0].word;
                let def = data.list[0].definition;
                let sample = data.list[0].example;
                let timestamp = data.list[0].written_on;
                let source = data.list[0].permalink;
                sendMessage(true, api, event, def + "\n\nExample: \n" + sample);
            }).catch(function(error) {
                log(err);
                sendMessage(true, api, event, "An unknown error as been occured. Please try again later.")
            });
        }
    } else if (query.startsWith("summarize") || query2.startsWith("summ ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using summ text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsumm this sentence meant to be summarized.");
        } else {
            let text = input.substring(5);
            if (query.startsWith("summarize")) {
                text = input.substring(10)
            }
            const client = new NLPCloudClient('bart-large-cnn', apiKey[3])
            client.summarization(text).then(function({
                data
            }) {
                sendMessage(true, api, event, data.summary_text);
            }).catch(function(err) {
                log(err);
                sendMessage(true, api, event, "An unknown error as been occured. Please try again later.");
            });
        }
    }

    if (query.startsWith("baybayin")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using baybayin text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nbaybayin ako ay filipino")
        } else {
            data.shift()
            getResponseData('https://api-baybayin-transliterator.vercel.app/?text=' + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    sendMessage(true, api, event, response.baybay);
                }
            });
        }
    } else if (query.startsWith("doublestruck")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using doublestruck text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndoublestruck Hello World")
        } else {
            data.shift()
            getResponseData('https://api.popcat.xyz/doublestruck?text=' + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    sendMessage(true, api, event, response.text);
                }
            });
        }
    } else if (query.startsWith("translate")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using translate language text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntranslate English Kamusta")
        } else {
            let text = input.substring(10);
            let lang = text.split(" ");
            let message = text.substring(lang[0].length);
            getResponseData('https://api.popcat.xyz/translate?to=' + lang[0] + '&text=' + message).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    sendMessage(true, api, event, response.translated);
                }
            });
        }
    } else if (query.startsWith("weather")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using weather location instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nweather caloocan city")
        } else {
            data.shift()
            let weather = await weathersearch("weather " + data.join(" "))
            if (weather.weather == undefined || weather.weather.temperature == undefined) {
                weatherjs.find({
                    weathersearch: data.join(" "),
                    degreeType: 'C'
                }, (err, r) => {
                    if (err) return log(err);
                    let d = r[0]
                    let m = d.location.name + "\n\n"
                    m += "⦿ Temperature: " + d.current.temperature + "\n"
                    m += "⦿ Sky: " + d.current.skytext + "\n"
                    m += "⦿ Observation time: " + d.current.date + " " + d.current.observationtime
                    sendMessage(true, api, event, m)
                })
            } else {
                let output = weather.weather
                let m = output.location
                m += "\n\n⦿ Forecast: " + output.forecast
                m += "\n⦿ Temperature: " + output.temperature + "°F" + " (" + (Math.round(((output.temperature - 32) * 5 / 9) * 100) / 100).toFixed(2) + "°C)"
                if (output.precipitation != undefined)
                    m += "\n⦿ Precipitation: " + output.precipitation
                if (output.humidity != undefined)
                    m += "\n⦿ Humidity: " + output.humidity
                if (output.wind != undefined)
                    m += "\n⦿ Wind speed: " + output.wind
                sendMessage(true, api, event, m)
            }
        }
    } else if (query.startsWith("facts")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using facts text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfacts computer")
        } else {
            data.shift()
            let url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
            parseImage(api, event, url, __dirname + "/cache/images/facts_" + getTimestamp() + ".png");
        }
    } else if (query == "wyr" || query == "wouldyourather") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/wyr").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                sendMessage(true, api, event, "Would you rather " + response.ops1 + " or " + response.ops2);
            }
        });
    } else if (query == "meowfacts") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://meowfacts.herokuapp.com/").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                sendMessage(true, api, event, response.data);
            }
        });
    } else if (query == "8ball") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/8ball").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                sendMessage(true, api, event, response.answer);
            }
        });
    } else if (query.startsWith("instagram") || query2.startsWith("ig ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using instagram username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ninstagram melvinjonesrepol")
        } else {
            data.shift()
            let userN = data.join(" ");
            if (userN.startsWith("@")) {
                userN = userN.slice(1);
            }
            getResponseData('https://manhict.tech/api/igInfo?query=' + userN + '&apikey=' + apiKey[0]).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately instagram user \"" + userN + "\" was not found.");
                } else {
                    let username = response.result.username;
                    let fullname = response.result.fullname;
                    let biography = response.result.biography;
                    let reels = new Intl.NumberFormat().format(response.result.reels);
                    let followers = new Intl.NumberFormat().format(response.result.followers);
                    let following = new Intl.NumberFormat().format(response.result.following);
                    let private = ((response.result.private) ? "Yes" : "No");
                    let verified = ((response.result.verified) ? "Yes" : "No");
                    let profilepic = response.result.profilePicture;
                    let time = getTimestamp();

                    request(encodeURI(profilepic)).pipe(fs.createWriteStream(__dirname + '/cache/images/instaprofile_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: fullname + " @" + username + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified + "\n\n" + biography,
                                attachment: fs.createReadStream(__dirname + '/cache/images/instaprofile_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/instaprofile_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("profilepic")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let id;
        if ((event.type == "message_reply" && event.senderID != getMyId())) {
            id = event.messageReply.senderID;
        } else {
            id = event.senderID;
        }
        parseImage(api, event, getProfilePicFullHD(id), __dirname + "/cache/images/profilepic_" + getTimestamp() + ".png");
    } else if (query.startsWith("tiktok")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using tiktok username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntiktok mrepol742")
        } else {
            data.shift()
            let userN = data.join(" ");
            getResponseData('https://manhict.tech/api/tikInfo?query=' + userN + "&apikey=" + apiKey[0]).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately tiktok user \"" + userN + "\" was not found.");
                } else {
                    let username = response.result.uniqueId;
                    let name = response.result.nickname;
                    let bio = response.result.signature;
                    let followers = response.result.followerCount;
                    let following = response.result.followingCount;
                    let heart = response.result.heartCount;
                    let video = response.result.videoCount;
                    let digg = response.result.diggCount;
                    let avatar = response.result.avatar;
                    let time = getTimestamp();

                    request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/tiktok_avatar_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: name + " @" + username + "\n⦿ Hearts: " + heart + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Videos: " + video + "\n⦿ Digg: " + digg + "\n\n" + bio,
                                attachment: fs.createReadStream(__dirname + '/cache/images/tiktok_avatar_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/tiktok_avatar_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("soundcloud")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using soundcloud username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsoundcloud Denvau")
        } else {
            data.shift()
            let userN = data.join(" ");
            getResponseData('https://manhict.tech/api/scInfo?query=' + encodeURI(userN) + "&apikey=" + apiKey[0]).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately soundcloud user \"" + userN + "\" was not found.");
                } else {
                    let name = response.result['full_name'];
                    let username = response.result['username'];
                    let bio = response.result['description'];
                    let location = response.result['city'] + " " + response.result['country_code'];
                    let followers = response.result['followers_count'];
                    let following = response.result['followings_count'];
                    let likes = response.result['likes_count'];
                    let playlist = response.result['playlist_count'];
                    let playlistLikes = response.result['playlist_likes_count'];
                    let trackCount = response.result['track_count'];
                    let permalinkUrl = response.result['permalink_url'];
                    let avatar = response.result['avatar_url'];
                    let time = getTimestamp();

                    request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/soundcloud_avatar_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: name + " @" + username + "\n⦿ Location: " + location + "\n⦿ Likes: " + likes + "\n⦿ Playlist: " + playlist + "\n⦿ Playlist Likes: " + playlistLikes + "\n⦿ Tracks: " + trackCount + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n\n" + bio + "\n" + permalinkUrl,
                                attachment: fs.createReadStream(__dirname + '/cache/images/soundcloud_avatar_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/soundcloud_avatar_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("github")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using github username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngithub mrepol742")
        } else {
            data.shift()
            let userN = data.join(" ");
            if (userN.startsWith("@")) {
                userN = userN.slice(1);
            }
            getResponseData('https://api.popcat.xyz/github/' + userN).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately github user \"" + userN + "\" was not found.");
                } else {
                    let name = response.name;
                    let email = response.email;
                    let bio = response.bio;
                    let company = response.company;
                    let location = response.location;
                    let url = response.blog;
                    let followers = response.followers;
                    let following = response.following;
                    let public_repos = response.public_repos;
                    let public_gists = response.public_gists;
                    let avatar = response.avatar;
                    let time = getTimestamp();

                    if (bio == "No Bio") {
                        bio = "";
                    }

                    request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/github_avatar_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: "⦿ Name: " + name + "\n⦿ Email: " + email + "\n⦿ Location: " + location + "\n⦿ Company: " + company + "\n⦿ Website: " + url + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Public Repository: " + public_repos + "\n⦿ Public Gists: " + public_gists + "\n\n" + bio + "\nhttps://github.com/" + userN,
                                attachment: fs.createReadStream(__dirname + '/cache/images/github_avatar_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/github_avatar_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("element")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using element name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nelement hydrogen")
        } else {
            data.shift()
            let symbol = data.join(" ");
            getResponseData('https://api.popcat.xyz/periodic-table?element=' + symbol).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately element \"" + symbol + "\" was not found.");
                } else {
                    let name = response.name;
                    let symbol = response.symbol;
                    let atomic_number = response.atomic_number;
                    let atomic_mass = response.atomic_mass;
                    let period = response.period;
                    let phase = response.phase;
                    let discovered_by = response.discovered_by;
                    let image = response.image;
                    let summary = response.summary;
                    let time = getTimestamp();

                    request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/element_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: "⦿ Name: " + name + "\n⦿ Symbol: " + symbol + "\n⦿ Atomic Number: " + atomic_number + "\n⦿ Atomic Mass: " + atomic_mass + "\n⦿ Peroid: " + period + "\n⦿ Phase: " + phase + "\n⦿ Discovered by: " + discovered_by + "\n\n" + summary,
                                attachment: fs.createReadStream(__dirname + '/cache/images/element_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/element_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("npm")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using npm name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnpm mrepol742")
        } else {
            data.shift()
            let name = data.join(" ");
            getResponseData('https://api.popcat.xyz/npm?q=' + name).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately npm \"" + name + "\" was not found.");
                } else {
                    let name = response.name;
                    let version = response.version;
                    let description = response.description;
                    let author = response.author;
                    let last_published = response.last_published;
                    let downloads_this_year = response.downloads_this_year;
                    let repository = response.repository;
                    let author_email = response.author_email;
                    sendMessage(true, api, event, "⦿ Name: " + name + " v" + version + "\n⦿ Author: " + author + "\n⦿ Email: " + author_email + "\n⦿ Updated on: " + last_published + "\n⦿ Repository: " + repository + "\n\n" + description);
                }
            });
        }
    } else if (query.startsWith("steam")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using steam name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsteam minecraft")
        } else {
            data.shift()
            let name = data.join(" ");
            getResponseData('https://api.popcat.xyz/steam?q=' + name).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately the \"" + name + "\" was not found on steam.");
                } else {
                    let name = response.name;
                    let developers = response.developers;
                    let website = response.website;
                    let description = response.description;
                    let banner = response.banner;
                    let price = response.price;
                    let time = getTimestamp();

                    request(encodeURI(banner)).pipe(fs.createWriteStream(__dirname + '/cache/images/steam_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: "⦿ Name: " + name + "\n⦿ Price: " + price + "\n⦿ Developers: " + developers + "\n⦿ Website: " + website + "\n\n" + description,
                                attachment: fs.createReadStream(__dirname + '/cache/images/steam_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/steam_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("imdb")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using imdb name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nimdb iron man")
        } else {
            data.shift()
            let name = data.join(" ");
            getResponseData('https://api.popcat.xyz/imdb?q=' + name).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately imdb \"" + name + "\" was not found.");
                } else {
                    let title = response.title;
                    let year = response.year;
                    let runtime = response.runtime;
                    let actors = response.actors;
                    let poster = response.poster;
                    let genres = response.genres;
                    let plot = response.plot;
                    let time = getTimestamp();

                    request(encodeURI(poster)).pipe(fs.createWriteStream(__dirname + '/cache/images/imdb_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: "⦿ Title: " + title + " " + year + "\n⦿ Genres: " + genres + "\n⦿ Runtime: " + runtime + "\n⦿ Actors: " + actors + "\n\n" + plot,
                                attachment: fs.createReadStream(__dirname + '/cache/images/imdb_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/imdb_" + time + ".png");
                        })
                }
            });
        }
    } else if (query.startsWith("itunes")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using itunes title instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nitunes in the end")
        } else {
            data.shift()
            let name = data.join(" ");
            getResponseData('https://api.popcat.xyz/itunes?q=' + name).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately the \"" + name + "\" was not found in itunes music.");
                } else {
                    let name = response.name;
                    let artist = response.artist;
                    let album = response.album;
                    let genre = response.genre;
                    let length = response.length.replace('s', '');
                    let lenghtM = (Math.round((length / 60) * 100) / 100).toFixed(2);
                    let thumbnail = response.thumbnail;
                    let time = getTimestamp();

                    request(encodeURI(thumbnail)).pipe(fs.createWriteStream(__dirname + '/cache/images/itunes_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: "⦿ Name: " + name + " by " + artist + "\n⦿ Album: " + album + "\n⦿ Genre: " + genre + "\n⦿ Length: " + lenghtM + " minutes",
                                attachment: fs.createReadStream(__dirname + '/cache/images/itunes_' + time + '.png')
                            };
                            sendMessage(true, api, event, message);
                            unLink(__dirname + "/cache/images/itunes_" + time + ".png");
                        })
                }
            });
        }
    } else if (query == "car") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/car").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately car run away.");
            } else {
                let image = response.image;
                let title = response.title;
                let time = getTimestamp();

                request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/car_' + time + '.png'))

                    .on('finish', () => {
                        let message = {
                            body: title,
                            attachment: fs.createReadStream(__dirname + '/cache/images/car_' + time + '.png')
                        };
                        sendMessage(true, api, event, message);
                        unLink(__dirname + "/cache/images/car_" + time + ".png");
                    })
            }
        });
    } else if (query == "color") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/randomcolor").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately color fades away.");
            } else {
                let hex = response.hex;
                let name = response.name;
                let url = response.image;
                let time = getTimestamp();

                request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/color_' + time + '.png'))

                    .on('finish', () => {
                        let message = {
                            body: name + " #" + hex,
                            attachment: fs.createReadStream(__dirname + '/cache/images/color_' + time + '.png')
                        };
                        sendMessage(true, api, event, message);
                        unLink(__dirname + "/cache/images/color_" + time + ".png");
                    })
            }
        });
    } else if (query == "pickup") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/pickuplines").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately i forgot the line.");
            } else {
                sendMessage(true, api, event, response.pickupline);
            }
        });
    } else if (query.startsWith("gemoji")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using gemoji emoji instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngemoji 😂")
        } else {
            data.shift()
            if (!pictographic.test(data.join(" "))) {
                sendMessage(true, api, event, "Unable to set the chat quick reaction. Invalid emoji.");
            }
            api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                if (err) return log(err);
            });
        }
    } else if (query.startsWith("sendreport")) {
        if (isGoingToFastReporting(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using sendReport text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsendReport There is a problem in ______ that cause ______.")
        } else {
            data.shift()
            let report = "report " + event.senderID + " " + data.join(" ");
            log(report);
            api.sendMessage(report, getMyId(), (err, messageInfo) => {
                if (err) log(err);
            });
            sendMessage(true, api, event, "The engineers have been notified.");
        }
    } else if (query.startsWith("setmaxtokens")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setMaxTokens [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetMaxTokens 1000.")
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 4000) {
                    sendMessage(true, api, event, "Opps! the limit is 4000.");
                } else if (num < 10) {
                    sendMessage(true, api, event, "Opps! the minimum value 10");
                } else {
                    settings.max_tokens = num;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Max Tokens is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("settemperature")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setTemperature [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetTemperature 0.")
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 1) {
                    sendMessage(true, api, event, "Opps! the limit is 1.");
                } else if (num < -0) {
                    sendMessage(true, api, event, "Opps! the minimum value 0.1");
                } else {
                    settings.temperature = num;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Temperature is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("setfrequencypenalty")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setFrequencyPenalty [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetFrequencyPenalty 1.")
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 2) {
                    sendMessage(true, api, event, "Opps! the limit is 2.");
                } else if (num < -2) {
                    sendMessage(true, api, event, "Opps! the minimum value -2");
                } else {
                    settings.frequency_penalty = num;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Frequency Penalty is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("setpresencepenalty")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setPresencePenalty [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetPresencePenalty 1.")
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 2) {
                    sendMessage(true, api, event, "Opps! the limit is 2.");
                } else if (num < -2) {
                    sendMessage(true, api, event, "Opps! the minimum value -2");
                } else {
                    settings.presence_penalty = num;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Presence Penalty is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("settextcomplextion")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it.")
            } else {
                data.shift();
                let num = data.join(" ");
                settings.text_complextion = num;
                fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(true, api, event, "Text Complextion is now set to " + num);
            }
        }
    } else if (query.startsWith("setmaximage")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it.")
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 25) {
                    sendMessage(true, api, event, "Opps! the limit is 25.");
                } else if (num < 1) {
                    sendMessage(true, api, event, "Opps! the minimum value is 1.");
                } else {
                    settings.max_image = num;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Max Image is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("setprobabilitymass")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setProbabilityMass [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetProbabilityMass 0.1.")
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 1) {
                    sendMessage(true, api, event, "Opps! the limit is 1.");
                } else if (num < -0) {
                    sendMessage(true, api, event, "Opps! the minimum value is 0.");
                } else {
                    settings.probability_mass = num;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Probability Mass is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("settimezone")) {
        if (adm.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setTimezone timezone instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetTimezone Asia/Singapore")
            } else {
                data.shift();
                let pref = data.join(" ");
                if (timeZones.includes(pref)) {
                    settings.timezone = pref;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Timezone is now set to " + pref);
                    sendMessage(true, api, event, "It's " + getMonth(settings.timezone) + " " + getDayN(settings.timezone) + ", " + getDay(settings.timezone) + " " + formateDate(settings.timezone));
                } else {
                    sendMessage(true, api, event, "Timezone " + pref + " is invalid. Please input valid timezones.")
                }
            }
        }
    } else if (query.startsWith("setprefix")) {
        if (adm.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setPrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetPrefix $")
            } else {
                data.shift();
                let pref = data.join(" ");
                let first = pref.split("");
                if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(first)) {
                    settings.prefix = pref;
                    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(true, api, event, "Prefix is now set to " + pref);
                } else {
                    sendMessage(true, api, event, "Unable to set prefix to " + first + " due to some reasons. Please use only symbols such as ! @ # $ etc..")
                }
            }
        }
    } else if (query == "remprefix") {
        if (adm.includes(event.senderID)) {
            if (settings.prefix != "null" || settings.prefix != undefined) {
                settings.prefix = "null";
                fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(true, api, event, "Prefix reset to default values.");
            }
        }
    } else if (query.startsWith("ignoreprefix")) {
        if (adm.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using ignorePrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nignorePrefix alexa")
            } else {
                let pre = data.shift();
                let pre2 = formatQuery(pre.replace(/\s+/g, ''));
                if (pre2.startsWith("mj") || pre2.startsWith("melvinjones") || pre2.startsWith("melvinjonesgallanorepol") || pre2.startsWith("repol") || pre2.startsWith("melvinjonesrepol") || pre2.startsWith("mrepol742") || pre.startsWith(settings.prefix)) {
                    sendMessage(true, api, event, "Unable to do such an action.");
                } else if (!ignoredPrefix.includes(pre)) {
                    ignoredPrefix.push(pre);
                    fs.writeFileSync(__dirname + "/ignored_prefixes.json", JSON.stringify(ignoredPrefix), "utf8")
                    sendMessage(true, api, event, "`" + pre + "` is now ignored.");
                } else {
                    sendMessage(true, api, event, "It's already ignored.");
                }
            }
        }
    } else if (query.startsWith("unignoredprefix")) {
        if (adm.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using unignorePrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nunignorePrefix alexa")
            } else {
                let pre = data.shift();
                if (ignoredPrefix.includes(pre)) {
                    ignoredPrefix = ignoredPrefix.filter(item => item !== pre);
                    fs.writeFileSync(__dirname + "/ignored_prefixes.json", JSON.stringify(ignoredPrefix), "utf8")
                    sendMessage(true, api, event, "`" + pre + "` is now unignored.");
                } else {
                    sendMessage(true, api, event, "It is not in ignored list.");
                }
            }
        }
    } else if (query.startsWith("adduser")) {
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using addUser uid instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddUser 100024563636366");
        } else {
            data.shift();
            let pref = data.join(" ");
            if (pref.split("").length >= 15) {
                if (/^\d+$/.test(pref)) {
                    api.getThreadInfo(event.threadID, (err, gc) => {
                        if (err) return log(err);
                        if (gc.isGroup) {
                            if (!JSON.stringify(gc.adminIDs).includes(getMyId()) && gc.approvalMode) {
                                sendMessage("The user " + pref + " has been added and its on member approval lists.");
                            }
                            api.addUserToGroup(pref, event.threadID, (err) => {
                                if (err) log(err);
                                log("add_user " + event.threadID + " " + pref);
                            });
                        } else {
                            sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    })
                } else {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using addUser uid instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddUser 100024563636366");
                }
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using addUser uid instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddUser 100024563636366");
            }
        }
    } else if (query.startsWith("gcolor")) {
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using gcolor theme instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngcolor DefaultBlue");
        } else {
            data.shift();
            let pref = data.join(" ");
            if (gcolorn.includes(pref)) {
                api.changeThreadColor(gcolor[pref], event.threadID, (err) => {
                    if (err) return log(err);
                });
                log("change_color " + event.threadID + " " + gcolor[pref]);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using gcolor theme instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngcolor DefaultBlue");
            }
        }
    } else if (query.startsWith("welcomeuser")) {
        if (adm.includes(event.senderID)) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    let arr = gc.participantIDs;
                    if (input.includes("@")) {
                        let id = Object.keys(event.mentions)[0];
                        if (id === undefined) {
                            let data = input.split(" ");
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                api.getUserInfo(data[0].userID, (err, data1) => {
                                    if (err) return log(err);
                                    welcomeUser(api, event, data1.name, gc.threadName, arr.length, data[0].userID, "Welcome @" + data1.name + ". How are you?\n\n" + itbody);
                                });
                            });
                            return;
                        } else if (isMyId(id)) {
                            return;
                        }
                        api.getUserInfo(id, (err, data1) => {
                            if (err) return log(err);
                            welcomeUser(api, event, data1.name, gc.threadName, arr.length, id, "Welcome @" + data1.name + ". How are you?\n\n" + itbody);
                        });
                    } else {
                        sendMessage(true, api, event, "Opps! I didnt get it. You should try using welcomeuser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwelcomeuser @Zero Two")
                    }
                } else {
                    sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            })
        }
    } else if (query.startsWith("kickuser")) {
        if (adm.includes(event.senderID)) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    let arr = gc.participantIDs;
                    if (!JSON.stringify(gc.adminIDs).includes(getMyId())) {
                        sendMessage("Unfortunately i am not an admin on this group. I have no rights to kick any members.");
                        return;
                    }
                    if (input.includes("@")) {
                        let id = Object.keys(event.mentions)[0];
                        if (id === undefined) {
                            let data = input.split(" ");
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                removeUser(api, event, data[0].userID);
                                api.getUserInfo(data[0].userID, (err, data1) => {
                                    if (err) return log(err);
                                    byebyeUser(api, event, data1.name, gc.threadName, arr.length, data[0].userID);
                                });
                            });
                            return;
                        } else if (isMyId(id)) {
                            return;
                        }
                        removeUser(api, event, id);
                        api.getUserInfo(id, (err, data1) => {
                            if (err) return log(err);
                            byebyeUser(api, event, data1.name, gc.threadName, arr.length, id);
                        });
                    } else {
                        sendMessage(true, api, event, "Opps! I didnt get it. You should try using kickUser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nkickUser @Zero Two")
                    }
                } else {
                    sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            })
        }
    } else if (query.startsWith("blockuser")) {
        if (adm.includes(event.senderID)) {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    let data = input.split(" ");
                    data.shift();
                    api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                        if (err) return log(err);
                        blockUser(api, event, data[0].userID);
                    });
                    return;
                } else if (isMyId(id)) {
                    return;
                }
                blockUser(api, event, id)
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using blockUser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nblockUser @Zero Two")
            }
        }
    } else if (query == "mute") {
        mutedRRR.push(event.senderID);
        sendMessage(true, api, event, "You have been muted. Enter `unmute` for you to use my commands again.");
        fs.writeFileSync(__dirname + "/muted_users.json", JSON.stringify(mutedRRR), "utf8");
    } else if (query == "stop") {
        sendMessage(true, api, event, "Goodbye...");
        settings.isStop = true;
    } else if (query.startsWith("blockgroup")) {
        if (adm.includes(event.senderID)) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    blockGroup(api, event, event.threadID);
                } else {
                    sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            });
        }
    } else if (query.startsWith("smartreplyon")) {
        enableSmartReply(api, event, event.threadID);
    } else if (query.startsWith("smartreplyoff")) {
        disableSmartReply(api, event, event.threadID);
    } else if (query.startsWith("texttospeechon")) {
        enableTTS(api, event, event.threadID);
    } else if (query.startsWith("texttospeechoff")) {
        disableTTS(api, event, event.threadID);
    } else if (query.startsWith("listadmins")) {
        if (adm.includes(event.senderID)) {
            sendMessage(true, api, event, "Admins:\n" + adm);
        }
    } else if (query.startsWith("listblocks")) {
        if (adm.includes(event.senderID)) {
            sendMessage(true, api, event, "Users:\n" + blockRRR + "\n\nGroups:\n" + blockSSS);
        }
    } else if (query.startsWith("listmuted")) {
        if (adm.includes(event.senderID)) {
            sendMessage(true, api, event, "");
        }
    } else if (query.startsWith("unblockuser")) {
        if (adm.includes(event.senderID)) {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    let data = input.split(" ");
                    data.shift();
                    api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                        if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        unblockUser(api, event, data[0].userID);
                    });
                    return;
                } else if (isMyId(id)) {
                    return;
                }
                unblockUser(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using unblockUser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nunblockUser @Zero Two")
            }
        }
    } else if (query.startsWith("setkey")) {
        if (adm.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2 && !data[1].includes(":")) {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using setKey name:key instead.")
            } else {
                let inp = data[1].split(":");
                keys[inp[0]] = inp[1];
                fs.writeFileSync(__dirname + "/key.json", JSON.stringify(keys), "utf8")
                sendMessage(true, api, event, "Successfully saved " + inp[0] + ".");
            }
        }
    } else if (query.startsWith("listkey")) {
        if (adm.includes(event.senderID)) {
             
        
        }
    } else if (query.startsWith("addadmin")) {
        if (adm.includes(event.senderID)) {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    let data = input.split(" ");
                    data.shift();
                    api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                        if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        addAdmin(api, event, data[0].userID);
                    });
                    return;
                } 
                addAdmin(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using addAdmin @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddAdmin @Zero Two")
            }
        }
    } else if (query.startsWith("remadmin")) {
        if (adm.includes(event.senderID)) {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    let data = input.split(" ");
                    data.shift();
                    api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                        if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        remAdmin(api, event, data[0].userID);
                    });
                    return;
                } else if (isMyId(id)) {
                    return;
                }
                remAdmin(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using remAdmin @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nremAdmin @Zero Two")
            }
        }
    } else if ((query == "unsendon") && !settings.onUnsend) {
        if (adm.includes(event.senderID)) {
            settings.onUnsend = true
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Resending of unsend messages and attachments are now enabled.");
        }
    } else if ((query == "unsendoff") && settings.onUnsend) {
        if (adm.includes(event.senderID)) {
            settings.onUnsend = false
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Resending of unsend messages and attachments is been disabled.");
        }
    } else if ((query == "antileaveon") && !settings.antiLeave) {
        if (adm.includes(event.senderID)) {
            settings.antiLeave = true
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Readding of user who left is now enabled.");
        }
    } else if ((query == "antileaveoff") && settings.antiLeave) {
        if (adm.includes(event.senderID)) {
            settings.antiLeave = false
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Readding of user who left is been disabled.");
        }
    } else if ((query == "tagalogsupporton") && !settings.tagalog) {
        if (adm.includes(event.senderID)) {
            settings.tagalog = true
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Tagalog Support is now enabled.");
        }
    } else if ((query == "tagalogsupportoff") && settings.tagalog) {
        if (adm.includes(event.senderID)) {
            settings.tagalog = false
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Tagalog Support is been disabled.");
        }
    } else if ((query == "delayon") && !settings.onDelay) {
        if (adm.includes(event.senderID)) {
            settings.onDelay = true
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Delay on messages, replies and reaction are now enabled.");
        }
    } else if ((query == "delayoff") && settings.onDelay) {
        if (adm.includes(event.senderID)) {
            settings.onDelay = false
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Delay on messages, replies and reaction is been disabled.");
        }
    } else if ((query == "nsfwon") && !settings.onNsfw) {
        if (adm.includes(event.senderID)) {
            settings.onNsfw = true
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Not Safe For Work are now enabled.");
        }
    } else if ((query == "nsfwoff") && settings.onNsfw) {
        if (adm.includes(event.senderID)) {
            settings.onNsfw = false
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Not Safe For Work is been disabled.");
        }
    } else if ((query == "simultaneousexecutionon") && !settings.preventSimultaneousExecution) {
        if (adm.includes(event.senderID)) {
            settings.preventSimultaneousExecution = true
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Prevention of simulataneous execution are now enabled.");
        }
    } else if ((query == "simultaneousexecutionoff") && settings.preventSimultaneousExecution) {
        if (adm.includes(event.senderID)) {
            settings.preventSimultaneousExecution = false
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings), "utf8")
            sendMessage(true, api, event, "Prevention of simulataneous execution is now disabled.");
        }
    } else if (query == "gmember") {
        if (isGoingToFast(api, event)) {
            return;
        }
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (gc.isGroup) {
                let arr = gc.participantIDs;
                sendMessage(true, api, event, "This group has about " + arr.length + " members.")
            } else {
                sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
            }
        })
    } else if (query.startsWith("gname")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (gc.isGroup) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using gname text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngname Darling in the Franxx >3")
                } else {
                    data.shift()
                    api.setTitle(data.join(" "), event.threadID, (err, obj) => {
                        if (err) return log(err);
                    });
                }
            } else {
                sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
            }
        });
    } else if (query == "gname") {
        if (isGoingToFast(api, event)) {
            return;
        }
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (gc.isGroup) {
                sendMessage(true, api, event, gc.threadName);
            } else {
                sendMessage(true, api, event, "Unfortunately this is a personal chat and not a group chat.");
            }
        })
    } else if (query == "groupid" || query == "guid" || query == "uid") {
        if (isGoingToFast(api, event)) {
            return;
        }
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (event.type == "message" && gc.isGroup && (query == "guid" || query == "groupid")) {
                sendMessage(true, api, event, "The @" + gc.threadName + " guid is " + event.threadID);
            } else if (event.type == "message_reply") {
                let id1;
                if (isMyId(id1)) {
                    id1 = event.senderID;
                } else {
                    id1 = event.messageReply.senderID;
                }
                api.getUserInfo(id1, (err, info) => {
                    if (err) return log(err);
                    let message = {
                        body: "@" + info[id1]['name'] + " uid is " + id1,
                        mentions: [{
                            tag: '@' + info[id1]['name'],
                            id: id1,
                            fromIndex: 0
                        }]
                    }
                    sendMessage(true, api, event, message);
                });
            } else {
                sendMessage(true, api, event, "Your uid is " + event.senderID);
            }
        });
    } else if (query == "cmd" || query == "cmd1" || query == "cmd0") {
        if (isGoingToFast(api, event)) {
            return;
        }
        sendMessage(true, api, event, help + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
    } else if (query.startsWith("cmd") && /^\d+$/.test(query.substring(3))) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let num = query.substring(3);
        switch (num) {
            case "2":
                sendMessage(true, api, event, help1 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            case "3":
                sendMessage(true, api, event, help2 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            case "4":
                sendMessage(true, api, event, help3 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            case "5":
                sendMessage(true, api, event, help4 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            case "6":
                sendMessage(true, api, event, help5 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            case "7":
                sendMessage(true, api, event, help6 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            case "8":
                sendMessage(true, api, event, help7 + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
                break;
            default:
                sendMessage(true, api, event, "Seem's like that's too far from the command list pages.");
                break;
        }
    } else if (query == "cmdadmin") {
        if (isGoingToFast(api, event)) {
            return;
        }
        sendMessage(true, api, event, helpadmin + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
    } else if (query == "cmdroot") {
        if (isGoingToFast(api, event)) {
            return;
        }
        sendMessage(true, api, event, helproot + "\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
    } else if (query == "cmdall") {
        if (isGoingToFast(api, event)) {
            return;
        }
        sendMessage(true, api, event, "Due to the limitations on messenger platform.\nAll command list are now moved to: https://mrepol742.github.io/project-orion/#cmdall\n\n>> " + qot[Math.floor(Math.random() * qot.length)]);
    } else if (query.startsWith("cmd") && /^\d+$/.test(query.substring(3))) {
        if (isGoingToFast(api, event)) {
            return;
        }
        sendMessage(true, api, event, "Oops! Seems like you already reach the end of the commands list. Developers are still cooking new features for this awesome project.");
    } else if (query.startsWith("wiki")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using wiki text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwiki Google")
        } else {
            let txt = input.substring("5");
            getResponseData("https://en.wikipedia.org/api/rest_v1/page/summary/" + txt).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately the wiki " + txt + " was not found.");
                } else {
                    sendMessage(true, api, event, response.extract);
                }
            });
        }
    } else if (query.startsWith("lovetest")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using lovetest name:name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlovetest Edogawa Conan: Ran Mouri")
        } else {
            let text = input;
            text = text.substring(9).split(":");
            const options = {
                method: 'GET',
                url: 'https://love-calculator.p.rapidapi.com/getPercentage',
                params: {
                    sname: text[0],
                    fname: text[1]
                },
                headers: {
                    'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
                    'X-RapidAPI-Key': '1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74'
                }
            };
            axios.request(options).then(function({
                data
            }) {
                var name1 = data.fname;
                var name2 = data.sname;
                var percent = data.percentage + "%";
                var result = data.result;
                sendMessage(true, api, event, name1 + " ❤️ " + name2 + "\n\n⦿ Percentage: " + percent + "\n" + result);
            }).catch(function(error) {
                log(error);
                sendMessage(true, api, event, "An unknown error as been occured. Please try again later.")
            });
        }
    } else if (query.startsWith("kiss")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using kiss @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nkiss @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            kiss(api, event, data[0].userID)
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                kiss(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using kiss @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nkiss @Zero Two")
            }
        }
    } else if (query.startsWith("gun")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using gun @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngun @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            gun(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                gun(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using gun @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngun @Zero Two")
            }
        }
    } else if (query.startsWith("wanted")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using wanted @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwanted @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            wanted(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                wanted(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using wanted @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwanted @Zero Two")
            }
        }
    } else if (query.startsWith("clown")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using clown @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nclown @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            clown(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                clown(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using clown @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nclown @Zero Two")
            }
        }
    } else if (query.startsWith("drip")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using drip @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndrip @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            drip(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                drip(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using drip @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndrip @Zero Two")
            }
        }
    } else if (query.startsWith("communist")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using communist @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncommunist @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            communist(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                communist(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using communist @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncommunist @Zero Two")
            }
        }
    } else if (query.startsWith("advert")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using advert @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nadvert @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            advert(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                advert(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using advert @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nadvert @Zero Two")
            }
        }
    } else if (query.startsWith("uncover")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using uncover @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nuncover @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            uncover(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                uncover(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using uncover @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nuncover @Zero Two")
            }
        }
    } else if (query.startsWith("jail")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using jail @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\njail @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            jail(api, event, id = data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                jail(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using jail @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\njail @Zero Two")
            }
        }
    } else if (query.startsWith("invert")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using invert @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ninvert @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            invert(api, event, data[0].userID);
                        });
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                invert(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using invert @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ninvert @Zero Two")
            }
        }
    } else if (query.startsWith("ship")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nship @Edogawa Conan @Ran Mouri")
        } else {
            if ((input.split('@').length - 1) >= 2) {
                let id1 = Object.keys(event.mentions)[0];
                let id2 = Object.keys(event.mentions)[1];
                if (id1 === undefined || id2 === undefined) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nship @Edogawa Conan @Ran Mouri")
                    return;
                }
                if (isMyId(id1)) {
                    id1 = event.senderID;
                } else if (isMyId(id2)) {
                    id2 = event.senderID;
                }
                parseImage(api, event, "https://api.popcat.xyz/ship?user1=" + getProfilePic(id1) + "&user2=" + getProfilePic(id2), __dirname + "/cache/images/ship_" + getTimestamp() + ".png");
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nship @Edogawa Conan @Ran Mouri")
            }
        }
    } else if (query.startsWith("www")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using www @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwww @Edogawa Conan @Ran Mouri")
        } else {
            if ((input.split('@').length - 1) >= 2) {
                let id1 = Object.keys(event.mentions)[0];
                let id2 = Object.keys(event.mentions)[1];
                if (id1 === undefined || id2 === undefined) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using www @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwww @Edogawa Conan @Ran Mouri")
                    return;
                }
                if (isMyId(id1)) {
                    id1 = event.senderID;
                } else if (isMyId(id2)) {
                    id2 = event.senderID;
                }
                parseImage(api, event, "https://api.popcat.xyz/whowouldwin?image1=" + getProfilePic(id1) + "&image2=" + getProfilePic(id2), __dirname + "/cache/images/www_" + getTimestamp() + ".png");
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using www @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwww @Edogawa Conan @Ran Mouri")
            }
        }
    } else if (query.startsWith("pet")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using pet @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npet @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            pet(api, event, id);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                pet(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using pet @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npet @Zero Two")
            }
        }
    } else if (query.startsWith("formatnumbers")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using formatnumbers number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nformatnumbers 326346436")
        } else {
            data.shift();
            sendMessage(true, api, event, numberWithCommas(data.join(" ")));
        }
    } else if (query.startsWith("wordstonumbers")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using wordsToNumbers number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwordsToNumbers one hundred and five")
        } else {
            data.shift();
            sendMessage(true, api, event, numberWithCommas(wordsToNumbers(data.join(" "))));
        }
    } else if (query.startsWith("mnm")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using mnm @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmnm @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            mnm(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                mnm(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using mnm @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmnm @Zero Two")
            }
        }
    } else if (query.startsWith("greyscale")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using greyscale @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngreyscale @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            greyscale(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                greyscale(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using greyscale @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngreyscale @Zero Two")
            }
        }
    } else if (query.startsWith("jokeover")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using jokeover @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\njokeover @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            jokeover(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                jokeover(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using jokeover @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\njokeover @Zero Two")
            }
        }
    } else if (query.startsWith("blur")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using blur @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nblur @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            blur(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                blur(api, event, id);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using blur @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nblur @Zero Two")
            }
        }
    } else if (query.startsWith("facebook") || query2.startsWith("fb ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using facebook @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfacebook @Zero Two")
        } else {
            if (input.includes("@")) {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            id = data[0].userID;
                        });
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                api.getUserInfo(id, async (err, ret) => {
                    if (err) return log(err);
                    for (let prop in ret) {
                        let {
                            vanity,
                            name,
                            gender,
                            isBirthday
                        } = ret[prop]
                        let url = encodeURI('https://graph.facebook.com/' + `${prop}` + '/picture?height=720&width=720&access_token=' + apiKey[1])
                        let time = getTimestamp();
                        let filename = __dirname + "/cache/images/facebook_" + time + ".jpg";
                        let msg = checkFound(name) + " @" + checkFound(vanity);
                        msg += "\n⦿ Gender: " + (gender == 1 ? "female" : "male");
                        msg += "\n⦿ Birthday: " + checkFound(isBirthday);

                        await download(url, filename, () => {
                            let message = {
                                body: msg,
                                attachment: fs.createReadStream(filename)
                            };
                            sendMessage(true, api, event, message);
                            unLink(filename);
                        })
                    }
                });
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using facebook @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfacebook @Zero Two")
            }
        }
    } else if (query.startsWith("morse")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(6)
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using morse text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmorse .... . .-.. .-.. ---");
        } else {
            getResponseData("https://api.popcat.xyz/texttomorse?text=" + text).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    sendMessage(true, api, event, response.morse);
                }
            });
        }
    } else if (query.startsWith("lulcat")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(7)
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using lulcat text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlulcat meowww");
        } else {
            getResponseData("https://api.popcat.xyz/lulcat?text=" + text).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    sendMessage(true, api, event, response.text);
                }
            });
        }
    } else if (query.startsWith("mock")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(5)
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using mock text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmock i have no idea");
        } else {
            getResponseData("https://api.popcat.xyz/mock?text=" + text).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Seems like there was an internal problem.");
                } else {
                    sendMessage(true, api, event, response.text);
                }
            });
        }
    } else if (query.startsWith("coding")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://eager-meitner-f8adb8.netlify.app/.netlify/functions/random").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately the code throws an exception.");
            } else {
                let url = response.url;
                let title = response.title;
                let time = getTimestamp();

                request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/coding_' + time + '.png'))

                    .on('finish', () => {
                        let message = {
                            body: title,
                            attachment: fs.createReadStream(__dirname + '/cache/images/coding_' + time + '.png')
                        };
                        sendMessage(true, api, event, message);
                        unLink(__dirname + "/cache/images/coding_" + time + ".png");
                    })
            }
        });
    } else if (query == "joke") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/joke").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately the joke is me.");
            } else {
                sendMessage(true, api, event, response.joke);
            }
        });
    } else if (query == "barrier") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let message = {
            body: "Anti horny barrier activated.",
            attachment: fs.createReadStream(__dirname + '/assets/barrier.jpg')
        };
        sendMessage(true, api, event, message);
    } else if (query == "fact") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/fact").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately the fact is not true.");
            } else {
                sendMessage(true, api, event, response.fact);
            }
        });
    } else if (query == "thoughts") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/showerthoughts").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Unfortunately i never had any shower thoughts anymore.");
            } else {
                sendMessage(true, api, event, response.result);
            }
        });
    } else if (query.startsWith("nickname")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(9)
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnickname @Zero Two Darling");
        } else {
            if (input.includes("@")) {
                await wait(3000);
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (input.includes("@me")) {
                        id = event.senderID;
                    } else {
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(true, api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            changeNickname(api, event, data[0].userID, text);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                changeNickname(api, event, id, text);
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnickname @Zero Two Darling");
            }
        }
    } else if (query.startsWith("drake")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(6).split(":");
        let data = input.split(" ");
        if (data.length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using drake text1: text2 instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndrake error: bug");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/drake?text1=" + text[0] + "&text2=" + text[1], __dirname + "/cache/images/drake_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("pika")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(5);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using pika text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npika hayssss");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/pikachu?text=" + text, __dirname + "/cache/images/pika_" + getTimestamp() + ".png");
        }
    } else if (query == "meme") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/meme").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                parseImage(api, event, response.image, __dirname + '/cache/images/meme.png');
            }
        });
    } else if (query.startsWith("conan")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://mrepol742-gif-randomizer.vercel.app/api", __dirname + "/cache/images/conan_" + getTimestamp() + ".png");
    } else if (query.startsWith("oogway")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(7);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using oogway text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\noogway bug is not an error");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/oogway?text=" + text, __dirname + "/cache/images/oogway_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("hanime")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(7);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using hanime category instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nhanime waifu");
        } else {
            getResponseData("https://api.waifu.pics/nsfw/" + text).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "It seem like i cannot find any relavant result about " + text);
                } else {
                    parseImage(api, event, response.url, __dirname + "/cache/images/animensfw_" + getTimestamp() + ".png");
                }
            });
        }
    } else if (query == "hololive") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://zenzapis.xyz/randomanime/hololive?apikey=9c4c44db3725").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let time = getTimestamp();
                request(encodeURI(response.result.image)).pipe(fs.createWriteStream(__dirname + "/cache/images/hololive_" + time + ".png"))
                    .on('finish', () => {
                        let message = {
                            body: response.result.caption,
                            attachment: [
                                fs.createReadStream(__dirname + "/cache/images/hololive_" + time + ".png")
                            ]
                        }
                        sendMessage(true, api, event, message);
                    });
            }
        });
    } else if (query == "animecouples") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://zenzapis.xyz/randomanime/couples?apikey=9c4c44db3725").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let time = getTimestamp();
                request(encodeURI(response.result.male)).pipe(fs.createWriteStream(__dirname + "/cache/images/animecouple_male_" + time + ".png"))
                    .on('finish', () => {
                        request(encodeURI(response.result.female)).pipe(fs.createWriteStream(__dirname + "/cache/images/animecouple_female_" + time + ".png"))
                            .on('finish', () => {
                                let message = {
                                    attachment: [
                                        fs.createReadStream(__dirname + "/cache/images/animecouple_male_" + time + ".png"),
                                        fs.createReadStream(__dirname + "/cache/images/animecouple_female_" + time + ".png")
                                    ]
                                }
                                sendMessage(true, api, event, message);
                            });
                    });
            }
        });
    } else if (query.startsWith("anime")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(6);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using anime category instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nanime waifu");
        } else {
            getResponseData("https://api.waifu.pics/sfw/" + text).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "It seem like i cannot find any relavant result about " + text);
                } else {
                    parseImage(api, event, response.url, __dirname + "/cache/images/anime_" + getTimestamp() + ".png");
                }
            });
        }
    } else if (query.startsWith("trump")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(6);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using trump text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntrump bug is not an error");
        } else {
            parseImage(api, event, "https://un5vyw.deta.dev/tweet?text=" + text, __dirname + "/cache/images/trump_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("qrcode")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(7);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using qrcode text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nqrcode https://mrepol742.github.io");
        } else {
            parseImage(api, event, "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + text, __dirname + "/cache/images/qrcode_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("alert")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(6);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using alert text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nalert hello world");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/alert?text=" + text, __dirname + "/cache/images/alert_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("caution")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(8);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using caution text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncaution bug is not an error");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/caution?text=" + text, __dirname + "/cache/images/caution_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("biden")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(6);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using biden text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nbiden i am leaving twitter");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/biden?text=" + text, __dirname + "/cache/images/biden_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("website")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(8);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using website url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwebsite https://mrepol742.github.io");
        } else {
            if (text.startsWith("https://") || text.startsWith("http://")) {
                parseImage(api, event, "https://api.popcat.xyz/screenshot?url=" + encodeURI(text), __dirname + "/cache/images/website_" + getTimestamp() + ".png");
            } else {
                sendMessage(true, api, event, "It looks like you send invalid url. Does it have https or http scheme?");
            }
        }
    } else if (query2.startsWith("god ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(4);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using god text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngod explicit content");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/unforgivable?text=" + text, __dirname + "/cache/images/god_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("sadcat")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(7);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using sadcat text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsadcat meoww");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/sadcat?text=" + text, __dirname + "/cache/images/sadcat_" + getTimestamp() + ".png");
        }
    } else if (query2.startsWith("sim ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, hey[Math.floor(Math.random() * hey.length)]);
        } else {
            data.shift()
            let txt = data.join(" ");
            getResponseData('https://api.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=' + mjme[Math.floor(Math.random() * mjme.length)]).then((response) => {
                if (response == null) {
                    sendMessage(true, api, event, "Unfortunately i am not simp anymore.");
                } else {
                    sendMessage(true, api, event, response['success']);
                }
            });
        }
    } else if (query2.startsWith("pooh ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(5).split(":");
        let data = input.split(" ");
        if (data.length < 3) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using pooh text1: text2 instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npooh color: colour");
        } else {
            parseImage(api, event, "https://api.popcat.xyz/pooh?text1=" + text[0] + "&text2=" + text[1], __dirname + "/cache/images/pooh_" + getTimestamp() + ".png");
        }
    } else if (query == "landscape") {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://source.unsplash.com/1600x900/?landscape", __dirname + "/cache/images/landscape_" + getTimestamp() + ".png");
    } else if (query == "portrait") {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://source.unsplash.com/900x1600/?portrait", __dirname + "/cache/images/portrait_" + getTimestamp() + ".png");
    } else if (query.startsWith("landscape")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(10);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using landscape text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlandscape night");
        } else {
            parseImage(api, event, "https://source.unsplash.com/1600x900/?" + text, __dirname + "/cache/images/landscape_" + getTimestamp() + ".png");
        }
    } else if (query == "cosplay") {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/cosplay?apikey=9c4c44db3725", __dirname + "/cache/images/costplay_" + getTimestamp() + ".png");
    } else if (query == "darkjoke") {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/darkjoke?apikey=9c4c44db3725", __dirname + "/cache/images/darkjoke_" + getTimestamp() + ".png");
    } else if (query == "blackpink") {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/blackpink?apikey=9c4c44db3725", __dirname + "/cache/images/blackpink_" + getTimestamp() + ".png");
    } else if (query == "motor") {
        if (isGoingToFast(api, event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/motor?apikey=9c4c44db3725", __dirname + "/cache/images/motor_" + getTimestamp() + ".png");
    } else if (query.startsWith("portrait")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let text = input;
        text = text.substring(9);
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using portrait text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nportrait rgb");
        } else {
            parseImage(api, event, "https://source.unsplash.com/900x1600/?" + text, __dirname + "/cache/images/portrait_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("animequote")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://animechan.vercel.app/api/random").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                sendMessage(true, api, event, response.quote + "\n\nby " + response.character + " of " + response.anime);
            }
        });
    } else if (query == "advice") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://zenquotes.io/api/random").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let result;
                for (let i = 0; i < response.length; i++) {
                    result = response[i].q;
                }
                sendMessage(true, api, event, result);
            }
        });
    } else if (query2.startsWith("time ")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using time timezone instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntime Asia/Singapore");
        } else {
            let body = input.substring(5);
            if (timeZones.includes(body)) {
                sendMessage(true, api, event, "It's " + getMonth(body) + " " + getDayN(body) + ", " + getDay(body) + " " + formateDate(body));
            } else {
                sendMessage(true, api, event, "Opps! I didnt get it. You should try using time timezone instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntime Asia/Singapore");
            }
        }
    } else if (query == "time") {
        sendMessage(true, api, event, "It's " + getMonth(settings.timezone) + " " + getDayN(settings.timezone) + ", " + getDay(settings.timezone) + " " + formateDate(settings.timezone));
    } else if (query.startsWith("inspiration")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://zenquotes.io/api/random").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let result;
                for (let i = 0; i < response.length; i++) {
                    result = response[i].a + " says\n" + response[i].q;
                }
                sendMessage(true, api, event, result);
            }
        });
    } else if (query.startsWith("motivation") || query.startsWith("motivate")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://zenquotes.io/api/random").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let result;
                for (let i = 0; i < response.length; i++) {
                    result = response[i].q + "\n\nby " + response[i].a;
                }
                sendMessage(true, api, event, result);
            }
        });
    } else if (query == "newyear") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let yr = new Date().getFullYear() + 1;
        let future = new Date("Jan 1, " + yr + " 00:00:00").getTime();
        let now = new Date().getTime();
        let count = future - now;
        let days = Math.floor(count / (1000 * 60 * 60 * 24));
        let hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((count % (1000 * 60)) / 1000);
        let message = {
            body: "There's " + days + "days " + hours + "hours " + minutes + "minutes and " + seconds + "seconds before New Year.",
        };
        sendMessage(true, api, event, message)
    } else if (query == "christmas") {
        if (isGoingToFast(api, event)) {
            return;
        }
        let yr = new Date().getFullYear();
        let future = new Date("Dec 25, " + yr + " 00:00:00").getTime();
        let now = new Date().getTime();
        let count = future - now;
        let days = Math.floor(count / (1000 * 60 * 60 * 24));
        let hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((count % (1000 * 60)) / 1000);
        let message = {
            body: "There's " + days + "days " + hours + "hours " + minutes + "minutes and " + seconds + "seconds before Christmas.",
        };
        sendMessage(true, api, event, message)
    } else if (query == "verserandom") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let result;
                for (let i = 0; i < response.length; i++) {
                    result = response[i].text + "\n\n" + response[i].bookname + " " + response[i].chapter + ":" + response[i].verse;
                }
                sendMessage(true, api, event, result);
            }
        });
    } else if (query == "versetoday") {
        if (isGoingToFast(api, event)) {
            return;
        }
        getResponseData("https://labs.bible.org/api/?passage=votd&type=json").then((response) => {
            if (response == null) {
                sendMessage(true, api, event, "Seems like there was an internal problem.");
            } else {
                let result;
                for (let i = 0; i < response.length; i++) {
                    result = response[i].text + "\n\n" + response[i].bookname + " " + response[i].chapter + ":" + response[i].verse;
                }
                sendMessage(true, api, event, result);
            }
        });
    } else if (query.startsWith("verse")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ")
        if (data.length < 2) {
            sendMessage(true, api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nverse Job 4:9");
        } else {
            data.shift()
            let body = data.join(" ");
            getResponseData("http://labs.bible.org/api/?passage=" + body + "&type=json").then((r) => {
                if (r == null) {
                    sendMessage(true, api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nverse Job 4:9");
                } else {
                    let result = ""
                    let total = r.length
                    for (let i = 0; i < total; i++) {
                        result += r[i].text + "\n\n" + r[i].bookname + " " + r[i].chapter + ":" + r[i].verse;
                    }
                    sendMessage(true, api, event, result);
                }
            })
        }
    } else if (query == "refreshstate") {
        if (adm.includes(event.senderID)) {
            fs.writeFileSync(__dirname + "/app_state.json", JSON.stringify(api.getAppState()), "utf8");
            sendMessage(true, api, event, "The AppState refreshed.");
            fb_stateD = getFormattedDate();
        }
    } else if (query == "refreshgroup") {
        if (isMyId(event.senderID)) {
            api.getThreadList(5000, null, ['INBOX'], (err, list) => {
                if (err) return log(err);
                for (let i = 0; i <= list.length; i++) {
                  if (list[i].isGroup) {
                    group.push(list[i].threadID);
                  }
                } 
            });
        }
    } else if (query == "savestate") {
        if (adm.includes(event.senderID)) {
            fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
            fs.writeFileSync(__dirname + "/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
            fs.writeFileSync(__dirname + "/group.json", JSON.stringify(group), "utf8");
            sendMessage(true, api, event, "The state have saved successfully.");
            messagesD = getFormattedDate();
        }
    } else if (query == "test" || query == "hello world" || query == "hi world") {
        sendMessage(true, api, event, "Hello World");
    } else if (query == "about") {
        let message = {
            body: itbody,
            attachment: [fs.createReadStream(__dirname + "/assets/mrepol742.png")]
        }
        sendMessage(true, api, event, message);
    } else if (query == "copyright") {
        let message = {
            body: "Melvin Jones Repol Ⓒ 2023. All Rights Reserved. The Project Orion is a Closed Source Project.\nMelvin Jones Repol Ⓒ 2018-2023. All Rights Reserved. The Project Webvium is a Closed Source Project.\n\n⦿ cmd\n⦿ about\n⦿ uptime\n⦿ license\n\nhttps://project-orion.mrepol742.repl.co",
            attachment: [fs.createReadStream(__dirname + "/assets/mrepol742.png")]
        }
        sendMessage(true, api, event, message);
    } else if (query == "license") {
        let message = {
            body: "/*\n* Copyright Ⓒ MREPOL742 - All Rights Reserved\n" +
                "* Unauthorized copying of this file, via any medium is strictly prohibited\n" +
                "* Proprietary and confidential\n" +
                "* Written by Melvin Jones Repol <mrepol742@gmail.com>, November 2022\n" +
                "*/\n\nUNDER PRIVACY POLICY OF THE WEBVIUM PROJECT 2023.\nhttps://mrepol742.github.io/webvium/privacypolicy/\n\n⦿ cmd\n⦿ copyright\n⦿ uptime\n⦿ about\n\nhttps://project-orion.mrepol742.repl.co",
            attachment: [fs.createReadStream(__dirname + "/assets/mrepol742.png")]
        }
        sendMessage(true, api, event, message);
    } else {
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (gc.isGroup) {
                if ((event.type == "message_reply" && event.senderID != getMyId())) {
                    if (event.messageReply.senderID == getMyId()) {
                        someR(api, event, query);
                    }
                } else {
                    if (isMyId(Object.keys(event.mentions)[0]) || (query.includes("@") && isMe(query2)) || !query.includes("@")) {
                        someR(api, event, query);
                    }
                }
            } else {
                someR(api, event, query);
            }
        });
    }
}

function someA(api, event, query, input) {
    if (query == "sup" || query == "wassup") {
        sendMessage(true, api, event, sup[Math.floor(Math.random() * sup.length)]);
        return true;
    } else if (query == "hi" || query == "hello" || query == "hey") {
        sendMessage(true, api, event, hey[Math.floor(Math.random() * hey.length)]);
        return true;
    } else if (query.startsWith("okay")) {
        sendMessage(true, api, event, "Yup");
        return true;
    } else if (query == "idk") {
        sendMessage(true, api, event, "I dont know too...");
        return true;
    }
    return false;
}

async function reaction(api, event, query, input) {
    if (containsAny(query, happyEE) || (input.includes("😂") || input.includes("🤣") || input.includes("😆"))) {
        reactMessage(api, event, ":laughing:");
        if (query.includes("hahahaha") || query.includes("hahhaha") || query.includes("ahhahahh")) {
            sendMessage(true, api, event, funD[Math.floor(Math.random() * funD.length)])
        }
    } else if (containsAny(input.toLowerCase(), sadEE)) {
        reactMessage(api, event, ":sad:");
    } else if (containsAny(input.toLowerCase(), angryEE)) {
        reactMessage(api, event, ":angry:");
    } else if (containsAny(query, loveEE) || (query == "bot" || query == "good")) {
        reactMessage(api, event, ":love:");
    } else if (query == "tsk") {
        reactMessage(api, event, ":like:");
    } else if (query == "nice" || query == "uwu") {
        reactMessage(api, event, ":heart:");
    }
}

function someR(api, event, query) {
    if (query.startsWith("goodeve") || query.startsWith("evening")) {
        reactMessage(api, event, ":love:");
        sendMessage(true, api, event, goodev[Math.floor(Math.random() * goodev.length)]);
        if (!isEvening(settings.timezone)) {
            sendMessageOnly(true, api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + " over here.");
        }
        return true;
    } else if (query.startsWith("goodmorn") || query.startsWith("morning")) {
        reactMessage(api, event, ":love:");
        sendMessage(true, api, event, goodmo[Math.floor(Math.random() * goodmo.length)]);
        if (!isMorning(settings.timezone)) {
            sendMessageOnly(true, api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + " over here.");
        }
        return true;
    } else if (query.startsWith("goodnight") || query.startsWith("night")) {
        reactMessage(api, event, ":love:");
        sendMessage(true, api, event, goodni[Math.floor(Math.random() * goodni.length)]);
        if (!isNight(settings.timezone)) {
            sendMessageOnly(true, api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + " over here.");
        }
        return true;
    } else if (query.startsWith("goodafter") || query.startsWith("afternoon")) {
        reactMessage(api, event, ":love:");
        sendMessage(true, api, event, goodaf[Math.floor(Math.random() * goodaf.length)]);
        if (!isAfternoon(settings.timezone)) {
            sendMessageOnly(true, api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + " over here.");
        }
        return true;
    }
    return false;
}

function parseImage(api, event, url, dir) {
    log("parse_image " + url);
    request(encodeURI(url)).pipe(fs.createWriteStream(dir))
        .on('finish', () => {
            let limit = 25 * 1024 * 1024;
            fs.readFile(dir, function(err, data) {
                if (err) log(err)
                if (data.length > limit) {
                    sendMessage(true, api, event, "Unfortunately i cannot send you the file due to the size restrictions on messenger platform.");
                } else {
                    let image = {
                        attachment: fs.createReadStream(dir)
                    };
                    sendMessage(true, api, event, image);
                }
                unLink(dir);
            })
        })
}

async function sendMessage(bn, api, event, message) {
    if (!adm.includes(event.senderID) && bn) {
        if (settings.onDelay) {
            await wait(sleep[Math.floor(Math.random() * sleep.length)] + 1000);
        }
    }
    api.getThreadInfo(event.threadID, (err, gc) => {
        if (err) return log(err);
        if (gc.isGroup) {
            let ts = undefined;
            api.getThreadHistory(event.threadID, 3, ts, (err, history) => {
                if (err) return log(err);
                if (ts != undefined) history.pop();
                let test = [];
                for (let i = 0; i < history.length; i++) {
                    if (history[i].senderID != getMyId()) {
                        test[i] = history[i].senderID;
                        log(test[i])
                    } else {
                        test[i] = undefined;
                    }
                }
                let filtered = test.filter(elm => elm);
                if (filtered[0] != filtered[1]) {
                    log("send_message_reply " + event.threadID + " " + message);
                    if (speech.includes(event.threadID)) {
                        const url = googleTTS.getAudioUrl(message, {
                            lang: 'en',
                            slow: false,
                            host: 'https://translate.google.com',
                        });
                        let time = getTimestamp();
                        request(url).pipe(fs.createWriteStream(__dirname + '/cache/audios/tts_' + time + '.mp3'))
                
                            .on('finish', () => {
                                let message = {
                                    attachment: fs.createReadStream(__dirname + '/cache/audios/tts_' + time + '.mp3'),
                                };
                                api.sendMessage(message, event.threadID, (err, messageInfo) => {
                                    if (err) log(err);
                                }, event.messageID);
                                unLink(__dirname + "/cache/audios/tts_" + time + ".mp3");
                            })
                    } else {
                        api.sendMessage(message, event.threadID, (err, messageInfo) => {
                            if (err) log(err);
                        }, event.messageID);
                    }
                } else {
                    log("send_message " + event.threadID + " " + message);
                    sendMMMS(api, event, message);
                }
                ts = history[0].timestamp;
            });
        } else {
            log("send_message " + event.threadID + " " + message);
            sendMMMS(api, event, message);
        }
    });
}

async function sendMessageOnly(bn, api, event, message) {
    if (!adm.includes(event.senderID) && bn) {
        if (settings.onDelay) {
            await wait(sleep[Math.floor(Math.random() * sleep.length)] + 1000);
        }
    }
    log("send_message " + event.threadID + " " + message);
    sendMMMS(api, event, message);
}

async function sendMMMS(api, event, message) {
    if (speech.includes(event.threadID) && (typeof event.body === "string")) {
        const url = googleTTS.getAudioUrl(message, {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
        });
        let time = getTimestamp();
        request(url).pipe(fs.createWriteStream(__dirname + '/cache/audios/tts_' + time + '.mp3'))

            .on('finish', () => {
                let message = {
                    attachment: fs.createReadStream(__dirname + '/cache/audios/tts_' + time + '.mp3'),
                };
                api.sendMessage(message, event.threadID, (err, messageInfo) => {
                    if (err) log(err);
                });
                unLink(__dirname + "/cache/audios/tts_" + time + ".mp3");
            })
    } else {
        api.sendMessage(message, event.threadID, (err, messageInfo) => {
            if (err) log(err);
        });
    }
}

async function reactMessage(api, event, reaction) {
    if (!adm.includes(event.senderID)) {
        if (settings.onDelay) {
            await wait(sleep[Math.floor(Math.random() * sleep.length)] + 1000);
        }
    }
    log("react_message " + event.messageID + " " + reaction);
    api.setMessageReaction(reaction, event.messageID, (err) => {
        if (err) log(err);
    });
}

function formatQuery(string) {
    let str = string.replace(pictographic, '');
    let normal = str.normalize('NFKC');
    let specialCharacters = normal.replace(normalize, '');
    let latin = specialCharacters.replace(latinC, '');
    return latin.toLowerCase();
}

function log(data) {
    console.log(getFormattedDate() + "$ " + data);
}

function getFormattedDate() {
    return new Date().toLocaleString("en-US", {
        timeZone: "Asia/Singapore"
    }).replace(",", "");
}

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.indexOf(substring) != -1) {
            return true;
        }
    }
    return false;
}

function isGoingToFast(api, event) {
    let input = event.body;
    log("event_body " + event.senderID + " " + input);
    if (input.startsWith("⦿")) {
        sendMessageOnly(true, api, event, "It's unnessesary to use ⦿ i would still understand you even without it.");
    }
    if (input.startsWith("_")) {
        sendMessageOnly(true, api, event, "It's unnessesary to use _ i would still understand you even without it.");
    }
    if (!settings.preventSimultaneousExecution) {
        return false;
    }
    if (!(adm.includes(event.senderID))) {
        if (!(event.senderID in cmd)) {
            cmd[event.senderID] = Math.floor(Date.now() / 1000) + (20);
            return false;
        } else if (Math.floor(Date.now() / 1000) < cmd[event.senderID]) {
            let seconds = (cmd[event.senderID] - Math.floor(Date.now() / 1000)) % 20;
            //sendMessage(true, api, event, "Hold on for " + seconds + " seconds.");
            log("The UserID is temporarily blocked for " + seconds + " seconds.");
            return true;
        } else {
            cmd[event.senderID] = Math.floor(Date.now() / 1000) + (20);
            return false;
        }
    }
    /*
    if (!(event.threadID in cmd1)) {
        cmd1[event.threadID] = Math.floor(Date.now() / 1000) + (120);
        return false;
    } else if (Math.floor(Date.now() / 1000) < cmd1[event.threadID]) {
        let seconds = (cmd1[event.threadID] - Math.floor(Date.now() / 1000)) % 120;
        sendMessageOnly(true, api, event, "It looks like you guys are going to fast of calling this AI commands. Please wait " + seconds + " seconds.");
        log("The ThreadID is temporarily blocked for " + seconds + " seconds");
        return true;
    } else {
        cmd1[event.threadID] = Math.floor(Date.now() / 1000) + (120);
        return false;
    }
    */
    return false;
}

function isGoingToFastResendingOfEmo(event) {
    if (!(event.threadID in emo)) {
        emo[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 2);
        return false;
    } else if (Math.floor(Date.now() / 1000) < emo[event.threadID]) {
        let seconds = (emo[event.threadID] - Math.floor(Date.now() / 1000)) % (60 * 2);
        log("The ThreadID is temporarily blocked from resending of emoji for " + seconds + " seconds.");
        return true;
    } else {
        emo[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 2);
        return false;
    }
}

function isGoingToFastCallingTheCommand(event) {
    if (!(event.threadID in threadMaintenance)) {
        threadMaintenance[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 5);
        return false;
    } else if (Math.floor(Date.now() / 1000) < threadMaintenance[event.threadID]) {
        let seconds = (threadMaintenance[event.threadID] - Math.floor(Date.now() / 1000)) % (60 * 5);
        log("The ThreadID is temporarily blocked from sending the Maintenance message for " + seconds + " seconds.");
        return true;
    } else {
        threadMaintenance[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 5);
        return false;
    }
}

function repeatOfNonWWW(event) {
    if (!(event.threadID in nwww)) {
        nwww[event.threadID] = Math.floor(Date.now() / 1000) + (60);
        return false;
    } else if (Math.floor(Date.now() / 1000) < nwww[event.threadID]) {
        let seconds = (nwww[event.threadID] - Math.floor(Date.now() / 1000)) % 60;
        log("The ThreadID is temporarily blocked from resending AI Query for " + seconds + " seconds.")
        return true;
    } else {
        nwww[event.threadID] = Math.floor(Date.now() / 1000) + (60);
        return false;
    }
}

function isGoingToFastReporting(api, event) {
    if (!(event.threadID in userWhoSendDamnReports)) {
        userWhoSendDamnReports[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 10);
        return false;
    } else if (Math.floor(Date.now() / 1000) < userWhoSendDamnReports[event.threadID]) {
        let seconds = (userWhoSendDamnReports[event.threadID] - Math.floor(Date.now() / 1000)) % (60 * 10);
        sendMessage(true, api, event, "Please wait " + seconds + " seconds. Before sending another report.");
        log("The ThreadID is temporarily blocked from using sendReport for " + seconds + " seconds.");
        return true;
    } else {
        userWhoSendDamnReports[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 10);
        return false;
    }
}

let download = async function(uri, filename, callback) {
    log("download " + uri);
    await request(encodeURI(uri)).pipe(fs.createWriteStream(filename)).on('close', callback);
};

const checkFound = (text) => {
    return text ? text : "N/A"
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

async function getResponseData(url) {
    log("response_data " + url);
    await wait(1000);
    let data = await axios.get(encodeURI(url)).then((response) => {
        if (response.data.error === undefined) {
            return response.data;
        } else {
            log("response_null " + url);
            return null;
        }
    }).catch((err) => {
        log("response_data_err " + err)
        return null
    });
    return data
}

function countWords(str) {
    try {
        return str.split(' ').filter(function(n) {
            return n != ''
        }).length;
    } catch (err) {
        return 5;
    }
}

function countVowel(str) {
    const count = str.match(/[aeiou]/gi).length;
    return count;
}

function countConsonants(str) {
    var countConsonants = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] !== "a" && str[i] !== "e" && str[i] !== "i" &&
            str[i] !== "o" && str[i] !== "u" && str[i] !== " ") {
            countConsonants++;
        }
    }
    return (countConsonants);
}

function nsfw(text) {
    return (text.includes("jabol") || text.includes("nude") || text.includes("hentai") || text.includes("milf") ||
        text.includes("masturbate") || text.includes("pussy") || text.includes("dick") || text.includes("horny") ||
        text.includes("blowjob") || text.includes("lolli ") || text.includes("sex ") || text.includes("jakol ") ||
        text.includes("kantot ") || text.includes("jabol ") || text.includes("porn ") || text.includes("sex ")) && !settings.onNsfw;
}

function getProfilePic(id) {
    return "https://graph.facebook.com/" + id + "/picture?access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
}

function getProfilePicFullHD(id) {
    return "https://graph.facebook.com/" + id + "/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
}

function isMe(query) {
    return query.includes("melvin jones repol") || query.includes("melvin jones") || query.includes("melvin jones gallano repol") ||
        query.includes("mj") || query.includes("mrepol742");
}

function isMorning(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 3 && curHr <= 11;
}

function isAfternoon(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 12 && curHr <= 17;
}

function isEvening(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 18 && curHr <= 21;
}

function isNight(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 22;
}

function getDayNightTime(tz) {
    if (isMorning(tz)) {
        return "morning";
    } else if (isEvening(tz)) {
        return "evening";
    } else if (isAfternoon(tz)) {
        return "afternoon";
    }
    return "night";
}

function formateDate(tz) {
    var hours = getTimeDate(tz).getHours();
    var minutes = getTimeDate(tz).getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function getDay(tz) {
    return days[getTimeDate(tz).getDay()];
}

function getDayN(tz) {
    return getTimeDate(tz).getDate();
}

function getMonth(tz) {
    return months[getTimeDate(tz).getMonth()];
}

function getTimeDate(tz) {
    return new Date(new Date().toLocaleString("en-US", {
        timeZone: tz
    }))
}

function getSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function otherQ(query) {
    for (let i = 0; i < sqq.length; i++) {
        if (query.startsWith(sqq[i] + " ") && query.split(" ").length > 2 ||
            (query.endsWith("?") || query.endsWith("!") || query.endsWith("."))) {
            return true;
        }
    }
    return false;
}

function isMyId(id) {
    return id == "100071743848974" || id == "100016029218667";
}

function getMyId() {
    return "100071743848974";
}

function getWelcomeImage(name, gname, Tmem, id) {
    return "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + name + "&text2=" + gname + "&text3=" + getSuffix(Tmem) + " member&avatar=" + getProfilePic(id)
}

async function getImages(api, event, images) {
    let time = getTimestamp();
    let name = [];
    for (let i = 0;
        (i < parseInt(settings.max_image) && i < images.length); i++) {
        await wait(1000);
        let url = images[i].url;
        log("get_images " + url);
        let type = images[i].type;
        if ((type == "image/png" || type == "image/jpg" || type == "image/jpeg") && !url.endsWith(".svg.png")) {
            let fname = __dirname + "/cache/images/findimg" + i + "_" + time + ".png";
            log("fname " + fname);
            log("accepted_url " + url);
            request(encodeURI(url)).pipe(fs.createWriteStream(fname));
            name.push(fname);
        }
    }
    await wait(1000);
    let accm = [];
    for (let i = 0; i < name.length; i++) {
        log("push_url " + name[i]);
        accm.push(fs.createReadStream(name[i]));
    }
    let message = {
        attachment: accm
    };
    api.sendMessage(message, event.threadID, (err, messageInfo) => {
        if (err) {
            log(err);
            sendMessage(true, api, event, "Seem's like i am having an issue finding it.");
        }
        for (let i = 0; i < name.length; i++) {
            unLink(name[i])
        }
    }, event.messageID)
}

async function unsendPhoto(api, event, d, data) {
    let time = getTimestamp();
    let arr = d[1][2];
    let images = []
    for (let i = 0; i < arr.length; i++) {
        await wait(1000);
        let fname = __dirname + "/cache/images/unsend_photo_" + i + "_" + time + ".png";
        request(d[1][2][i]).pipe(fs.createWriteStream(fname));
        images.push(fname);
    }
    await wait(1000);
    let accm = [];
    for (let i = 0; i < images.length; i++) {
        accm.push(fs.createReadStream(images[i]));
    }

    if (settings.onUnsend && !threads.includes(event.threadID)) {
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (gc.isGroup) {
                let constructMMM = "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                let message1 = {
                    body: constructMMM,
                    attachment: accm,
                    mentions: [{
                        tag: '@' + data[event.senderID]['name'],
                        id: event.senderID,
                        fromIndex: 0
                    }]
                }
                api.sendMessage(message1, event.threadID, (err, messageInfo) => {
                    if (err) {
                        log(err);
                    }
                    for (let i = 0; i < images.length; i++) {
                        unLink(images[i])
                    }
                })
                log("unsend_photo_group " + d[1][0]);
            } else {
                let constructMMM = "You deleted this photo. \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                let message1 = {
                    body: constructMMM,
                    attachment: accm
                }
                api.sendMessage(message1, event.threadID, (err, messageInfo) => {
                    if (err) {
                        log(err);
                    }
                    for (let i = 0; i < images.length; i++) {
                        unLink(images[i])
                    }
                })
                log("unsend_photo " + d[1][0]);
            }
        });
    }
}

async function unsendGif(api, event, d, data) {
    let time = getTimestamp();
    let arr = d[1][2];
    let images = []
    for (let i = 0; i < arr.length; i++) {
        await wait(1000);
        let fname = __dirname + "/cache/images/unsend_gif_" + i + "_" + time + ".png";
        request(d[1][2][i]).pipe(fs.createWriteStream(fname));
        images.push(fname);
    }
    await wait(1000);
    let accm = [];
    for (let i = 0; i < images.length; i++) {
        accm.push(fs.createReadStream(images[i]));
    }

    if (settings.onUnsend && !threads.includes(event.threadID)) {
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return log(err);
            if (gc.isGroup) {
                let constructMMM = "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                let message1 = {
                    body: constructMMM,
                    attachment: accm,
                    mentions: [{
                        tag: '@' + data[event.senderID]['name'],
                        id: event.senderID,
                        fromIndex: 0
                    }]
                }
                api.sendMessage(message1, event.threadID, (err, messageInfo) => {
                    if (err) {
                        log(err);
                    }
                    for (let i = 0; i < images.length; i++) {
                        unLink(images[i])
                    }
                })
                log("unsend_gif_group " + d[1][0]);
            } else {
                 let constructMMM = "You deleted this photo. \n";
                                            if (!(d[1][3] === undefined)) {
                                                constructMMM += d[1][3];
                                            }
                let message1 = {
                    body: constructMMM,
                    attachment: accm
                }
                api.sendMessage(message1, event.threadID, (err, messageInfo) => {
                    if (err) {
                        log(err);
                    }
                    for (let i = 0; i < images.length; i++) {
                        unLink(images[i])
                    }
                })
                log("unsend_gif " + d[1][0]);
            }
        });
    }
}

async function unLink(dir) {
    await wait(1000*120);
    fs.unlink(dir, (err => {
        if (err) log(err);
        else {
            log("un_link " + dir);
        }
    }));
}

const convertBytes = function(bytes) {
    if (bytes == 0) {
        return "n/a"
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    if (i == 0) {
        return bytes + " " + sizesM[i]
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizesM[i]
}

function secondsToTime(e) {
    let h = parseInt(Math.floor(e / 3600).toString().padStart(2, '0'), 10);
    let m = parseInt(Math.floor(e % 3600 / 60).toString().padStart(2, '0'), 10);
    let s = parseInt(Math.floor(e % 60).toString().padStart(2, '0'), 10);
    let constructTime = "";
    if (h >= 1) {
        if (h == 1) {
            constructTime += h + " hour";
        } else {
            constructTime += h + " hours";
        }
    }
    if (constructTime.includes("hour")) {
        constructTime += " and ";
    }
    if (m >= 1) {
        if (m == 1) {
            constructTime += m + " minute";
        } else {
            constructTime += m + " minutes";
        }
    }
    if (constructTime.includes("minute")) {
        constructTime += " and ";
    }
    if (s >= 1) {
        if (s == 1) {
            constructTime += s + " second";
        } else {
            constructTime += s + " seconds";
        }
    }
    constructTime += ".";
    return constructTime;
}

function removeUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    api.removeUserFromGroup(id, event.threadID, (err) => {
        if (err) log(err);
        log("user_remove " + event.threadID + " " + id);
    });
}

function blockUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    if (blockRRR.includes(id)) {
        sendMessage(true, api, event, "It's already blocked.");
        return;
    }
    blockRRR.push(id);
    fs.writeFileSync(__dirname + "/block_users.json", JSON.stringify(blockRRR), "utf8");
    if (adm.includes(id)) {
        adm = adm.filter(item => item !== id);
        fs.writeFileSync(__dirname + "/admin.json", JSON.stringify(adm), "utf8");
        sendMessage(true, api, event, "The user " + id + " is blocked and it's admin status is being revoked.");
    } else {
        sendMessage(true, api, event, "The user " + id + " is blocked.");
    }
}

function blockGroup(api, event, id) {
    if (blockSSS.includes(id)) {
        sendMessage(true, api, event, "Group is already blocked.");
        return;
    }
    blockSSS.push(id);
    sendMessage(true, api, event, "The group " + id + " is blocked.");
    fs.writeFileSync(__dirname + "/block_groups.json", JSON.stringify(blockSSS), "utf8");
}

function unblockGroup(api, event, id) {
    if (!blockSSS.includes(id)) {
        sendMessage(true, api, event, "The group is not blocked.");
        return;
    }
    blockSSS = blockSSS.filter(item => item !== id);
    sendMessage(true, api, event, "The group " + id + " can now use my commands.");
    fs.writeFileSync(__dirname + "/block_groups.json", JSON.stringify(blockSSS), "utf8");
}

function enableTTS(api, event, id) {
    speech.push(id);
    sendMessage(true, api, event, "Speech Synthesis is turn on for thread " + id);
    fs.writeFileSync(__dirname + "/speech.json", JSON.stringify(speech), "utf8");
}

function disableTTS(api, event, id) {
    speech = speech.filter(item => item != id);
    sendMessage(true, api, event, "Speech Synthesis is turn off for thread " + id);
    fs.writeFileSync(__dirname + "/speech.json", JSON.stringify(speech), "utf8");
}

function enableSmartReply(api, event, id) {
    smartRRR.push(id);
    sendMessage(true, api, event, "Smart Reply is turn on for thread " + id);
    fs.writeFileSync(__dirname + "/smart_reply.json", JSON.stringify(smartRRR), "utf8");
}

function disableSmartReply(api, event, id) {
    smartRRR = smartRRR.filter(item => item !== id);
    sendMessage(true, api, event, "Smart Reply is turn off for thread " + id);
    fs.writeFileSync(__dirname + "/smart_reply.json", JSON.stringify(smartRRR), "utf8");
}

function unblockUser(api, event, id) {
    if (!blockRRR.includes(id)) {
        sendMessage(true, api, event, "The user is not blocked.");
        return;
    }
    blockRRR = blockRRR.filter(item => item !== id);
    sendMessage(true, api, event, "The user " + id + " can now use my commands.");
    fs.writeFileSync(__dirname + "/block_users.json", JSON.stringify(blockRRR), "utf8");
}

function addAdmin(api, event, id) {
    if (blockRRR.includes(id)) {
        sendMessage(true, api, event, "I am unable to grand admin permission on a blocked user.");
        return;
    }
    if (adm.includes(id)) {
        sendMessage(true, api, event, "It's already an admin!");
        return;
    }
    adm.push(id);
    sendMessage(true, api, event, "Admin permission granted.");
    fs.writeFileSync(__dirname + "/admin.json", JSON.stringify(adm), "utf8");
}

function remAdmin(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    if (!adm.includes(id)) {
        sendMessage(true, api, event, "The user has no admin rights to take away.");
        return;
    }
    adm = adm.filter(item => item !== id);
    sendMessage(true, api, event, "Admin permission removed.");
    fs.writeFileSync(__dirname + "/admin.json", JSON.stringify(adm), "utf8");
}

function changeNickname(api, event, id, text) {
    if (isMyId(id)) {
        return;
    }
    api.getUserInfo(id, (err, info) => {
        if (err) return log(err);
        let name = info[id]['name'];
        let inp;
        if (text.startsWith("@me")) {
            inp = text.substring(4);
        } else {
            text.substring(name.length + 2);
        }
        api.changeNickname(inp, event.threadID, id, (err) => {
            if (err) return sendMessage(true, api, event, "Unfortunately there was an error occured while changing \"" + name + "\" nickname.");
        });
    })
}

function kiss(api, event, id) {
    getResponseData("https://api.satou-chan.xyz/api/endpoint/kiss").then((response) => {
        if (response == null) {
            sendMessage(true, api, event, "Seems like there was an internal problem.");
        } else {
            api.getUserInfo(id, (err, info) => {
                if (err) return log(err);
                let name = info[id]['name'];
                let time = getTimestamp();
                request(encodeURI(response.url)).pipe(fs.createWriteStream(__dirname + "/cache/images/kiss_" + time + ".png"))
                    .on('finish', () => {
                        let image = {
                            body: "@" + name,
                            attachment: fs.createReadStream(__dirname + "/cache/images/kiss_" + time + ".png"),
                            mentions: [{
                                tag: '@' + name,
                                id: id,
                                fromIndex: 0
                            }]
                        };
                        sendMessage(true, api, event, image);
                        unLink(__dirname + "/cache/images/kiss_" + time + ".png");
                    })
            })
        }
    });
}

function gun(api, event, id) {
    /*
    request({ url: getProfilePicFullHD(id), followRedirect: false }, function (err, res, body) {
        console.log(encodeURIComponent(res.headers.location));
        parseImage(api, event, "https://api.popcat.xyz/gun?image=" + encodeURIComponent(res.headers.location), __dirname + "/cache/images/gun_" + getTimestamp() + ".png");
     });*/
    parseImage(api, event, "https://api.popcat.xyz/gun?image=" + getProfilePic(id), __dirname + "/cache/images/gun_" + getTimestamp() + ".png");
}

function wanted(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/wanted?image=" + getProfilePic(id), __dirname + "/cache/images/wanted_" + getTimestamp() + ".png");
}

function clown(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/clown?image=" + getProfilePic(id), __dirname + "/cache/images/clown_" + getTimestamp() + ".png");
}

function drip(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/drip?image=" + getProfilePic(id), __dirname + "/cache/images/drip_" + getTimestamp() + ".png");
}

function communist(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/communist?image=" + getProfilePic(id), __dirname + "/cache/images/communist_" + getTimestamp() + ".png");
}

function advert(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/ad?image=" + getProfilePic(id), __dirname + "/cache/images/advert_" + getTimestamp() + ".png");
}

function uncover(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/uncover?image=" + getProfilePic(id), __dirname + "/cache/images/uncover_" + getTimestamp() + ".png");
}

function jail(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/jail?image=" + getProfilePic(id), __dirname + "/cache/images/jail_" + getTimestamp() + ".png");
}

function invert(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/invert?image=" + getProfilePic(id), __dirname + "/cache/images/invert_" + getTimestamp() + ".png");
}

function pet(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/pet?image=" + getProfilePic(id), __dirname + "/cache/images/pet_" + getTimestamp() + ".png");
}

function mnm(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/mnm?image=" + getProfilePic(id), __dirname + "/cache/images/mnm_" + getTimestamp() + ".png");
}

function greyscale(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/greyscale?image=" + getProfilePic(id), __dirname + "/cache/images/greyscale_" + getTimestamp() + ".png");
}

function jokeover(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/jokeoverhead?image=" + getProfilePic(id), __dirname + "/cache/images/jokeover_" + getTimestamp() + ".png");
}

function blur(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/blur?image=" + getProfilePic(id), __dirname + "/cache/images/blur_" + getTimestamp() + ".png");
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function welcomeUser(api, event, name, gname, Tmem, id, message1) {
    let time = getTimestamp();
    request(encodeURI(getWelcomeImage(name, gname, Tmem, id))).pipe(fs.createWriteStream(__dirname + "/cache/images/welcome_img_" + time + ".png"))
        .on('finish', () => {
            let message = {
                body: message1,
                attachment: fs.createReadStream(__dirname + "/cache/images/welcome_img_" + time + ".png"),
                mentions: [{
                    tag: name,
                    id: id
                }]
            };
            sendMessageOnly(true, api, event, message);
        })
}

function byebyeUser(api, event, name, gname, Tmem, id) {
    let time = getTimestamp();
    let filename = __dirname + "/cache/images/byebye_" + time + ".jpg";
    let url = "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + name + "&text2=" + gname + "&text3=" + Tmem + " Member&avatar=" + getProfilePic(id);
    request(encodeURI(url)).pipe(fs.createWriteStream(filename))
        .on('finish', () => {
            let message = {
                body: "Thank you for joining @" + name + " but now you're leaving us.",
                attachment: fs.createReadStream(filename),
                mentions: [{
                    tag: name,
                    id: id
                }]
            };
            sendMessageOnly(true, api, event, message);
            log("leave_member " + name);
            unLink(filename);
        })
}

function cdfNormal(x, mean, standardDeviation) {
    return (1 - mathjs.erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2
}

function factorial(num) {
    if (num == 0 || num == 1) {
        return 1;
    }
    return num * factorial(num - 1);
}

function findGCD(i, i2) {
    if (i2 == 0) {
        return i;
    }
    return findGCD(i2, i % i2);
}

function saveEvent(event) {
    if (event.senderID == getMyId()) {
        return;
    }
    if (event.attachments.length != 0) {
        log("attachments_type " + event.attachments[0].type);
        switch (event.attachments[0].type) {
            case "photo":
                let photo = [];
                for (let i = 0; i < 25; i++) {
                    if (!(event.attachments[i] === undefined)) {
                        photo.push(event.attachments[i].url);
                    }
                }
                let data = [getFormattedDate(), event.senderID, photo];
                if (event.body != null && (typeof event.body === "string")) {
                    data.push(event.body);
                }
                msgs[event.messageID] = ['photo', data];
                break;
            case "animated_image":
                let animated_images = [];
                for (let i = 0; i < 25; i++) {
                    if (!(event.attachments[i] === undefined)) {
                        animated_images.push(event.attachments[i].url);
                    }
                }
                let data1 = [getFormattedDate(), event.senderID, animated_images];
                if (event.body != null && (typeof event.body === "string")) {
                    data1.push(event.body);
                }
                msgs[event.messageID] = ['animated_images', data1];
                break;
            case "sticker":
                let data2 = [getFormattedDate(), event.senderID, event.attachments[0].url];
                if (event.body != null && (typeof event.body === "string")) {
                    data2.push(event.body);
                }
                msgs[event.messageID] = ['sticker', data2]
                break;
            case "video":
                let data3 = [getFormattedDate(), event.senderID, event.attachments[0].url];
                if (event.body != null && (typeof event.body === "string")) {
                    data3.push(event.body);
                }
                msgs[event.messageID] = ['video', data3]
                break;
            case "audio":
                let data4 = [getFormattedDate(), event.senderID, event.attachments[0].url];
                if (event.body != null && (typeof event.body === "string")) {
                    data4.push(event.body);
                }
                msgs[event.messageID] = ['audio', data4]
                break;
            case "file":
                log(JSON.stringify(event.attachments[0]));
                let data5 = [getFormattedDate(), event.senderID, event.attachments[0].filename, event.attachments[0].url];
                if (event.body != null && (typeof event.body === "string")) {
                    data5.push(event.body);
                }
                msgs[event.messageID] = ['file', data5];
                break;
            case "location":
                log(JSON.stringify(event.attachments[0]));
                msgs[event.messageID] = ['location', [getFormattedDate(), event.senderID, event.attachments[0].image, event.attachments[0].url, event.attachments[0].address]];
                break;
            case "share":
                msgs[event.messageID] = ['share', [getFormattedDate(), event.senderID, event.body, event.attachments[0].image]]
                break;
        }
    } else {
        msgs[event.messageID] = [getFormattedDate(), event.senderID, event.body];
    }
}

async function aiResponse(complextion, text, repeat) {
    try {
        const ai = await openai.createCompletion(generateParamaters(complextion, text));
        return formatResult(ai.data.choices[0].text);
    } catch (error) {
        if (error.response) {
          let status = error.response.status;
          log(status);
          log(error.response.data);
          if (status == 503 && repeat) {
            log("attempt initiated");
            aiResponse(getNewComplextion(settings.text_complextion), text, false);
          }
        } else {
          log(error.message);
        }
        err400++;
        return idknow[Math.floor(Math.random() * idknow.length)];
      }
}

function formatResult(str) {
    let finalDataCC = str.replace(/\n\s*\n/g, '\n');
    if (finalDataCC.startsWith("?") || finalDataCC.startsWith("!") || finalDataCC.startsWith(".") || finalDataCC.startsWith("-")) {
        finalDataCC = finalDataCC.slice(1);
    }
    return finalDataCC.replaceAll("'", "");
}

function generateParamaters(complextion, text) {
    return {
        model: complextion,
        prompt: text,
        temperature: parseInt(settings.temperature),
        max_tokens: parseInt(settings.max_tokens),
        top_p: parseInt(settings.probability_mass),
        frequency_penalty: parseInt(settings.frequency_penalty),
        presence_penalty: parseInt(settings.presence_penalty),
    }
}

function getNewComplextion(complextion) {
    if (complextion.includes("002")) {
        return "003";
    }
    return "002";
}

async function sendMessageToAll(api, message) {
    for (let i = 0; i < group.length; i++) {
        await wait(5000);
        api.sendMessage(message, group[i]);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isMyPrefix(input, query, query2) {
    return (settings.prefix != "" && input.startsWith(settings.prefix)) || query.startsWith("mj") ||
        query.startsWith("repol") || query.startsWith("mrepol742") || query.startsWith("melvinjonesrepol") || query.startsWith("melvinjones") || query.startsWith("melvinjonesgallanorepol") ||
        ((query.startsWith("search") || query.startsWith("gencode") || query.startsWith("what") || query.startsWith("when") || query.startsWith("who") || query.startsWith("where") ||
            query.startsWith("how") || query.startsWith("why") || query.startsWith("which"))) ||
        otherQ(query2) || (settings.tagalog && (query2.startsWith("ano ") || query2.startsWith("bakit ") || query2.startsWith("saan ") || query2.startsWith("sino ") || query2.startsWith("kailan ") || query2.startsWith("paano ")));
}