function S(type, el, string) {
	if (type === "id") {
		console.log("id="+'\''+el+'\'');
		return document.getElementById(el);
	} else if (type === "create") {
		console.log("element: "+'\''+el+'\''+" was created in memory");
		return document.createElement(el);
	} else {
		var body = S("id", "body"), e = "<p style='width:100%; background-color:rgba(255,155,155,1); font-family:Arial; color:white; border-left: solid 1em rgba(255,0,0,1);'><span style='color:red;'>Error:</span> the \"type\" entered: " + "\"" + type + "\"" + "<br/>Doesn't match: \"id\" or \"create\"";
		body.innerHTML = e;
	}
}
var output = S("create", "output"), body = S("id", "body");
body.appendChild(output);
output.innerHTML = "I am inside the output element";
