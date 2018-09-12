  var scene, camera, renderer, gui;

  AFRAME.registerComponent("vr-dat-gui", {
    init: function() {
      scene = document.querySelector("a-scene").object3D;
      camera = this.el.camera;
      renderer = this.el.renderer;
      console.log({ scene, camera, renderer });
      addGuiElements(scene, camera, renderer);
    }
  });

  var guiData = {
    testControllerEvents: function() {
      eventList.forEach(function(e) {
        var event = new Event(e);
        console.log(e + " : ");
        document.getElementById("leftControl").dispatchEvent(event);
      });
    }
  };


  function addGuiElements(scene, camera, renderer) {
    gui = dat.GUIVR.create("Sphere");
    gui.position.x = -2.5;
    gui.position.y = 1.5;
    gui.position.z = -1;

    gui.rotation.y = 0.6;
    //gui.rotation.set({x : 0.17, y : 0.6, z : -0.08});

    var sphere = document.querySelector("#sphere").object3D;
    ["x", "y", "z"].forEach(function(axis) {
      gui.add(sphere.scale, axis, 0, 10);
    });

    gui.add(guiData, "testControllerEvents");

    scene.add(gui);

    // Mouse input
    dat.GUIVR.enableMouse(camera, renderer);

    // Gaze input?
    var gazeInput = dat.GUIVR.addInputObject( camera );
    scene.add( gazeInput.cursor ); //  only add the cursor, not the laser

    // VR input
  //   var controls = ["left", "right"];
  //   controls.forEach(function(controllerSide) {
  //     var id = controllerSide + "Control";
  //     var controllerEl = document.getElementById(id);
  //     var object3D = controllerEl.object3D;
  //     // https://github.com/dataarts/dat.guiVR/wiki/Input-Support-(Vive-Controllers,-Mouse,-etc)
  //     var vrInput = dat.GUIVR.addInputObject(object3D);

  //     ["trigger", "trackpad", "grip"].forEach(function(baseEvent) {
  //       ["up", "down"].forEach(function(e) {
  //         controllerEl.addEventListener(baseEvent + e, function() {
  //           var gripEvent = baseEvent === "grip";
  //           //console.log( (gripEvent ? "gripped" : "pressed") + " " + controllerSide + " " + e );
  //           var value = e === "down";
  //           gripEvent ? vrInput.gripped(value) : vrInput.pressed(value);
  //         });
  //       });
  //     });

  //     scene.add(vrInput);
  //   });
  }
  
    AFRAME.registerComponent('dat-gui-controller', {
      schema : {
          query : {default : ""}
      },
      init : function() {
      if (this.data.query === "") {
        console.warn("Dat-gui-controller: no query, please add one");
        return;
      }
          scene = this.el.sceneEl.object3D;

          var controls = document.querySelectorAll(this.data.query);

          controls.forEach(function (controllerEl) {
              var object3D = controllerEl.object3D;
              // https://github.com/dataarts/dat.guiVR/wiki/Input-Support-(Vive-Controllers,-Mouse,-etc)
              var vrInput = dat.GUIVR.addInputObject( object3D );

              ['trigger', 'trackpad', 'grip'].forEach(function (baseEvent) {
                  ['up', 'down'].forEach(function (e) { controllerEl.addEventListener(baseEvent + e, function(){
                      var gripEvent = baseEvent === 'grip';
                      console.log((gripEvent ? 'gripped' : 'pressed') + " " + controllerEl + " " + e);
                      var value = (e === "down");
                      (gripEvent ? vrInput.gripped(value) : vrInput.pressed(value));
                  })})
              });
              scene.add(vrInput);
          });
      }
  });