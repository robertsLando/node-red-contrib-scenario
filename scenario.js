module.exports = function(RED) {

    function ScenarioNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
      //  var flow = this.context().flow;
        var timeout = null;
        var scenarios = config.scenes;
        var repeatType = config.repeatType || 'infinite';
        var repeatTimes = Number(config.repeatTimes) || 1;
        var repeatCounter = 0;
        var i = 0;
        var enabled = false;

        node.status({fill:"yellow",shape:"ring",text:"Stopped"});

        function sendScene(){
          if(enabled){
            node.send({payload:scenarios[i].value});
            var repeatString = '';
            switch(repeatType)
            {
              case 'once': repeatString = '(once)'; break;
              case 'custom':repeatString = `(${repeatCounter+1}/${repeatTimes})`; break;
              case 'infinite': repeatString = '(inf)';break;
            } 
            
            node.status({fill:"green",shape:"ring",text: `Scene ${i} started ${repeatString}`});
            timeout = setTimeout(sendScene,scenarios[i].time);
          }
          i++;
          if(i == scenarios.length) {
            i = 0;
            repeatCounter++;
          }

          switch(repeatType)
          {
            case 'once': 
              if(repeatCounter >= 1) stop(); break;
            case 'custom':
              if(repeatCounter >= repeatTimes) stop(); break;
            case 'infinite': break;
          }          
        }

        function stop(){
          if(timeout !== null) 
            clearTimeout(timeout);
          enabled = false;
          i = 0;
          repeatCounter = 0;
          node.status({fill:"yellow",shape:"ring",text:"Stopped"});
        }

        node.on('input', function(msg) {

          switch(msg.payload){
            case "start":
              enabled = true;
              i = 0;
              repeatCounter = 0;
              if(timeout !== null) clearTimeout(timeout);
              if(!scenarios || scenarios.length == 0) node.error("No scene found. Add scenes in node configuration.");
              else
                sendScene();
            break;

            case "stop": stop(); break;

            case "init":
              if(msg.scenes && msg.scenes.length > 0){
                  for(var i=0;i<msg.scenes.length;i++){
                      if(!msg.scenes[i].value || !msg.scenes[i].time || parseInt(msg.scenes[i].time) < 0){
                        node.error("Scene index " + i + " not valid.");
                        break;
                    }
                  }
                  if(i < msg.scenes.length) node.error("Invalid input scenes, check debug tab");
                  else scenarios = msg.scenes;
              }
            break;
          }

        });
    }
    RED.nodes.registerType("scenario",ScenarioNode);
}
