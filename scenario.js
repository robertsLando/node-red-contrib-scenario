module.exports = function(RED) {

    function ScenarioNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            var data = msg.payload;
            var error = false;


            node.send({payload: data});

        });
    }
    RED.nodes.registerType("scenario",ScenarioNode);
}
