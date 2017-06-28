module.exports = function(RED) {

    function ScenarioNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
      //  var flow = this.context().flow;
        var timeout = null;
        var scenarios = config.scenes;
        var i = 0;
        var enabled = false;

        function sendScene(){
          if(enabled){
            node.send({payload:scenarios[i].value});
            node.status({fill:"green",shape:"ring",text:"Scene "+ i + " started"});
            timeout = setTimeout(sendScene,scenarios[i].time);
          }
          i++;
          if(i == scenarios.length) i = 0;
        }


        node.on('input', function(msg) {

          switch(msg.payload){
            case "start":
              enabled = true;
              i = 0;
              if(timeout !== null) clearTimeout(timeout);

              sendScene();
            break;

            case "stop":
              if(timeout !== null) clearTimeout(timeout);
              enabled = true;
              i = 0;
              node.status({fill:"red",shape:"ring",text:"Stopped"});
            break;
          }

        });
    }
    RED.nodes.registerType("scenario",ScenarioNode);
}
