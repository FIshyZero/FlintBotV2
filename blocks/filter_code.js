const { TextChannel } = require("discord.js");

  module.exports = {
    name: "Filter Code",

    description: "Filter Code for Await Message Eeaction",

    category: ".MOD",

    inputs: [
      {
        "id": "action",
        "name": "Action",
        "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
        "types": ["action"]
    },
    {
        "id": "user",
        "name": "User",
        "description": "The user to listen for.",
        "types": ["object", "unspecified"]
    },
    ],

    options: [
      {
        "id": "target_type",
        "name": "Target Type",
        "description": "the user to listen for reactions",
        "type": "SELECT",
        "options": {
            0: "None",
            1: "",
            2: "Specific User (For reaction)",
            3: "Anyone (For reaction)",
            4: "",
            5: "Specific User (For message)",
            6: "Anyone (For message)",
            7: "",
            8: "TEST"
        }
      },
      {
        "id": "emoji_type",
        "name": "Emoji type",
        "description": "The type of emoji identifyier you want (ID, Name, or Both)",
        "type": "SELECT",
        "options": {
          1: "Full ID",
          2: "ID numbers only",
          3: "Name only"
        }
      },
      {
        "id": "emoji_input",
        "name": "Emoji",
        "description": "Ussage is ['emoji name', 'emoji name'] . You can leave this empty if you didn't select for reactions",
        "types": ["text", "unspecified" ],
        "required": true
      }
    ],

    outputs: [
      {
        "id": "action",
        "name": "Action",
        "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
        "types": ["action"]
    },
    {
        "id": "result",
        "name": "Result",
        "description": "Type: Unspecified\n\nDescription: The information obtained from the server emoji.",
        "types": ["text", "unspecified"]
    }
    ],

    async code(cache) {

      const user = this.GetInputValue("user", cache);
      const emoji_input = this.GetOptionValue("emoji_input", cache);

      const emoji_type = parseInt(this.GetOptionValue("emoji_type", cache));
      const target_type = parseInt(this.GetOptionValue("target_type", cache));

      let res;
      switch(emoji_type) {
        case 1:
          res = "toString()";
          break;
        case 2:
          res = "id";
          break;
        case 3:
          res = "name";
          break;
      this.storevalue(res, "res", cache);
      }

      let result = emoji_input;
      switch(target_type) {
        case 2:
          result = emoji_input + ".includes(reaction.emoji.name) && user.id == " + user.id; 
          break;
        case 3:
          result = emoji_input + ".includes(reaction.emoji.name)";
          break;
        case 5:
          result = "message.author.id == " + user.id;
          break;
        case 6:
          result = true;
          break;
        case 8:
          result = emoji_input + ".includes(reaction.emoji." + res + ") && user.id == " + user.id;
          break;
      }

      this.StoreOutputValue(result, "result", cache);
      this.RunNextBlock("action", cache);
    }
}
  
