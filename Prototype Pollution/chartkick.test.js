//https://github.com/ankane/chartkick.js/issues/117
test("Prototype pollution in chartkick", () => {     

    const Chartkick = require("chartkick")
    window.eval(`document.body.innerHTML = '<div id = "chart" />';`);
    let badOptions = JSON.parse('{"__proto__": {"polluted": "yes"}}');
    try {
        new Chartkick.LineChart("chart", {"2021-01-01": 11, "2021-01-02": 6}, badOptions);
    } catch(e) {} 
    
    expect({}.polluted).toBe("yes");
});

