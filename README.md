# node-red-contrib-scenario

Node-Red Node that can be configured to send a list of output messages with differents delays between them

# Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-scenario

# Usage

* *msg.payload = "start"* to start the scenario
* *msg.payload = "stop"* to stop the scenario.
* *msg.payload = "init"* to init the scenario with your own scenes (see example flow below).


The node will start to output scenes *value* added in node configuration, scenes *value* can be **String**, **Number**, **JSON** or **Bool**
each scene has a *time* of duration (in millisecond).


# Example

Copy and paste this flow to see how this node works


```
[{"id":"c24ce6a1.ba4d88","type":"inject","z":"73c97195.f4e8f","name":"","topic":"","payload":"start","payloadType":"str","repeat":"","crontab":"","once":false,"x":154,"y":528,"wires":[["60f46835.b48228"]]},{"id":"60f46835.b48228","type":"scenario","z":"73c97195.f4e8f","name":"","scenes":[],"x":489,"y":543,"wires":[["cb9a3fad.fc0ed","ffd6c424.d8d0e8"]]},{"id":"122b4c16.0569c4","type":"inject","z":"73c97195.f4e8f","name":"","topic":"","payload":"stop","payloadType":"str","repeat":"","crontab":"","once":false,"x":153,"y":573,"wires":[["60f46835.b48228"]]},{"id":"78353467.46e54c","type":"function","z":"73c97195.f4e8f","name":"","func":"msg.payload = \"init\";\nmsg.scenes = [{value: \"AABBCCDD\", time: 2000},\n             {value: 123456, time: 2000},\n             {value: [{id:\"lamp0\", value: true}, {id:\"lamp1\", value:false}], time: 4000},\n             {value: true, time: 3000}];\nreturn msg;","outputs":1,"noerr":0,"x":326,"y":620,"wires":[["60f46835.b48228"]]},{"id":"75c82685.2c4b68","type":"function","z":"73c97195.f4e8f","name":"","func":"msg.payload = \"init\";\nmsg.scenes = [{value: [{id:\"lamp0\", value: false}, {id:\"lamp1\", value:false}], time: 4000},\n             {value: [{id:\"lamp0\", value: false}, {id:\"lamp1\", value:true}], time: 3000},\n             {value: [{id:\"lamp0\", value: true}, {id:\"lamp1\", value:false}], time: 2000},\n             {value: [{id:\"lamp0\", value: true}, {id:\"lamp1\", value:true}], time: 2000},];\nreturn msg;","outputs":1,"noerr":0,"x":328,"y":664,"wires":[["60f46835.b48228"]]},{"id":"cb9a3fad.fc0ed","type":"split","z":"73c97195.f4e8f","name":"","splt":"","x":618,"y":543,"wires":[["8b734850.ee55c8"]]},{"id":"ffd6c424.d8d0e8","type":"debug","z":"73c97195.f4e8f","name":"","active":true,"console":"false","complete":"false","x":660,"y":633,"wires":[]},{"id":"d5d28940.6e3388","type":"inject","z":"73c97195.f4e8f","name":"init - random","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":174,"y":620,"wires":[["78353467.46e54c"]]},{"id":"dd770332.31ab2","type":"inject","z":"73c97195.f4e8f","name":"init - lamps","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":166,"y":664,"wires":[["75c82685.2c4b68"]]},{"id":"8b734850.ee55c8","type":"switch","z":"73c97195.f4e8f","name":"","property":"payload.id","propertyType":"msg","rules":[{"t":"eq","v":"lamp0","vt":"str"},{"t":"eq","v":"lamp1","vt":"str"}],"checkall":"true","outputs":2,"x":736,"y":543,"wires":[["1a883801.cd80e8"],["58547bad.de2f14"]]},{"id":"1a883801.cd80e8","type":"change","z":"73c97195.f4e8f","name":"value","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload.value","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":875,"y":501,"wires":[["183bc4c6.36b9bb"]]},{"id":"58547bad.de2f14","type":"change","z":"73c97195.f4e8f","name":"value","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload.value","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":876,"y":576,"wires":[["25bbc7bc.9bd2f8"]]},{"id":"183bc4c6.36b9bb","type":"ui_switch","z":"73c97195.f4e8f","name":"","label":"lamp0","group":"ae68a6.90419758","order":0,"width":0,"height":0,"passthru":true,"decouple":"false","topic":"","style":"","onvalue":"true","onvalueType":"bool","onicon":"","oncolor":"","offvalue":"false","offvalueType":"bool","officon":"","offcolor":"","x":1010.5,"y":501,"wires":[[]]},{"id":"25bbc7bc.9bd2f8","type":"ui_switch","z":"73c97195.f4e8f","name":"","label":"lamp1","group":"ae68a6.90419758","order":0,"width":0,"height":0,"passthru":true,"decouple":"false","topic":"","style":"","onvalue":"true","onvalueType":"bool","onicon":"","oncolor":"","offvalue":"false","offvalueType":"bool","officon":"","offcolor":"","x":1012,"y":576,"wires":[[]]},{"id":"ae68a6.90419758","type":"ui_group","z":"","name":"Lamps","tab":"89e88935.7363d8","disp":true,"width":"6"},{"id":"89e88935.7363d8","type":"ui_tab","z":"","name":"Scenario","icon":"home","order":1}]
```
