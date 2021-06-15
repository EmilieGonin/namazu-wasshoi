const XIVAPI = require("@xivapi/js");

export const fcId = process.env.VUE_APP_FC_ID;

export const xivapi = new XIVAPI({
  private_key: process.env.VUE_APP_XIVAPI_KEY,
  language: "fr"
})

export function cache(name, data) {
  const now = new Date();
  const item = {
    data: data,
    expiry: now.getTime() + 1800000
  }
  localStorage.setItem(name, JSON.stringify(item));
  return item;
}

export function checkCache(name) {
  const item = JSON.parse(localStorage.getItem(name));
  if (!item) {
    console.log("item not found");
    return false;
  }

  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(name)
    console.log("item expired");
    return false;
  } else {
    console.log("item not expired yet");
    return item;
  }
}

// export function setRequest(content, extension) {
//   return {
//     indexes: "InstanceContent,Item",
//     columns: "Name,ID,Banner,ContentType,GamePatch,ReqInstanceTargetID",
//     language: "fr",
//     body: {
//       query: {
//         bool: {
//           must: [
//             { match: { "ContentType.Name_en": content }},
//             { match: { "GamePatch.ExName": extension }}
//           ],
//           must_not: [
//             { wildcard: { Name_fr: "*irréel*" }},
//             { wildcard: { Name_fr: "*défi spécial*" }},
//             { match: { ReqInstanceTargetID: 2 }}
//           ]
//         }
//       },
//       size: 100,
//       sort: [
//         {
//         Order: "asc"
//         }
//       ]
//     }
//   }
// }
