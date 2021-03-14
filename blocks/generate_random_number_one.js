module.exports = {
    name: "Generate Random Number",

    description: "Generates a random number.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "min_number",
            "name": "Minimum Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The minimum number possible to return. Default: \"0\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_number",
            "name": "Maximum Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number possible to return. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "number",
            "name": "Number",
            "description": "Type: Number\n\nDescription: The random number generated.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const min_number = parseFloat(this.GetInputValue("min_number", cache)) || 0;
        let max_number = parseFloat(this.GetInputValue("max_number", cache));

        if(isNaN(max_number)) max_number = 1;
		
		const number = Math.floor(Math.random() * (max_number - min_number + 1)) + min_number
        this.StoreOutputValue(number , "number", cache);
        this.RunNextBlock("action", cache);
    }
}