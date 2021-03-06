var CAPACITY = 100000000;


Processes.listOfDevices['file_io'] = {
      main: function(){
        console.log(OS.ProcessQueue.queue.length);
        if (OS.ProcessQueue.queue.length > 0){
          return OS.ProcessQueue.dequeue();
        }
      },
      create: function(szNameOFCallingFunction,szFileName,szContent){
        console.log("Device creating for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        //container.innerHTML += "</br>Creating "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;
        
        if (Processes.listOfDevices['file_io'].capacityReached()) {
         
          process.state = "Stop";
          OS.display("Hard Drive Capacity Reached! Process: " + process.name + " terminated.");
        
        }
        else if(szContent.length + Directory.Files.reduce(flatten_callback, Directory.Files[0].accessLength()) > CAPACITY)
        {
          OS.display("Cannot create file, not enough hard drive space! Process: " + process.name + " terminated.");
        }
        else {

          var path = szFileName.split("/");
          var file = path.pop();

          var pathIsRelative = path[0] == "" || path[0] == "." || path[0] == "..";

          if (pathIsRelative) {
            path = path.join("/");
          } else {
            path = ["."].concat(path).join("/");
          }

          var currentDirectory = OS.FS.getDirectory(path);

          if (currentDirectory == Directory.Files) {
            Directory.Files.push(new File(file,szContent));
          } else {
              try{
                  currentDirectory.content.push(new File(file,szContent));
              } catch (e) {
                  OS.display("Directory does not exist");
              }
          }

        }
        
      },
      delete: function(szNameOFCallingFunction,szFileName){
        var szSetPwd = false;
        var aryParsedPath = szFileName.split("/");
        var aryPathChars = szFileName.split();
        var oCurrentDir = undefined;


        var path = szFileName.split("/");
        var name = path.pop();

        var pathIsRelative = path[0] == "" || path[0] == "." || path[0] == "..";

        if (pathIsRelative) {
          path = path.join("/");
        } else {
          path = ["."].concat(path).join("/");
        }

        var oTargetDirectory = OS.FS.getDirectory(path);
        
        if (oTargetDirectory == Directory.Files) {
          var index = oTargetDirectory.findIndex(function(resource){
            return resource.name == name;
          });

          oTargetDirectory.splice(index,1);

        } else {
          var index = oTargetDirectory.content.findIndex(function(resource){
            return resource.name == name;
          });

          oTargetDirectory.content.splice(index,1);
        }

        console.log("Device deleting for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        //container.innerHTML += "</br>Deleting "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        if(OS.FS.getPwd() == Directory.Files){
          szSetPwd = true;
        }

        if(szSetPwd == true){
          OS.FS.setPwd(Directory.Files);
        }
      },
      open: function(szNameOFCallingFunction,szFileName){
        console.log("Device opening for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
        //container.innerHTML += "</br>Opening "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";
        process.var.returnedFile = undefined;
        process.program_counter++;
        //get directory
        var aryParsedPath = szFileName.split("/");
        var nPathDepth = aryParsedPath.length;
        var szPathString = "";
        var oTargetDir = undefined;
 

        var name = aryParsedPath.pop();

        //var pathIsRelative = false;
        var pathIsRelative = aryParsedPath[0] == "" || aryParsedPath[0] == "." || aryParsedPath[0] == "..";

        if (pathIsRelative) {
          var path = aryParsedPath.join("/");
        } else {
          var path = ["."].concat(aryParsedPath).join("/");
        }

        //var path = aryParsedPath.join("/");
        oTargetDir = OS.FS.getDirectory(path);

        if (oTargetDir == Directory.Files) {
          process.var.returnedFile = oTargetDir.find(function(file){
            return file.name == name;
          });
        } else {
            try {
                process.var.returnedFile = oTargetDir.content.find(function(file){ 
                    return file.name == name;
                });
            } catch (e) {
                OS.display("Directory does not exist")
            }
        }

      },
      close: function(szNameOFCallingFunction,szFileName){
        console.log("Device closing for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
       // container.innerHTML += "</br>Closing "+szFileName+" for "+process.name;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        console.log(szFileName + " was closed.");
      },
      read: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device reading for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
       // container.innerHTML += "</br>Reading from "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        var content;
          try{
              var position = oFilePointer.accessPosition();
              var length = oFilePointer.accessLength();
          } catch (e) {
              var position = 0;
              var length = 0;
          }
        var endIndex = position + 100;
        if (position >= length){
          content = "";
        } else if(endIndex <= length){
          content = oFilePointer.accessContent().substring(position, endIndex);
          oFilePointer.mutatePosition(endIndex);
        }else {
          content = oFilePointer.accessContent().substring(position);
          oFilePointer.mutatePosition(length);
        }

        process.var.returnedFromRead = content;

      },
      write: function(szNameOFCallingFunction,oFilePointer,szInput){
        console.log("Device writing for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
       // container.innerHTML += "</br>Writing to "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        var contentOfFile = oFilePointer.accessContent();
        var positionInFile = oFilePointer.accessPosition();
        var lengthOfInput = szInput.length;
        var endIndex = positionInFile + lengthOfInput;
        var subString = contentOfFile.substring(positionInFile, endIndex);
        oFilePointer.mutateContent(contentOfFile.replace(subString,szInput));
      },
      position: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device finding postion for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
      //  container.innerHTML += "</br>Accessing position of "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;
          try{
              process.var.position =  oFilePointer.accessPosition();
          } catch (e) {
              process.var.position = 0;
          }

      },
      lengthOfFile: function(szNameOFCallingFunction,oFilePointer){
        console.log("Device acquiring length for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
     //   container.innerHTML += "</br>Accessing length of "+oFilePointer.accessName();
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;
        console.log(oFilePointer);
          try{
              process.var.length = oFilePointer.accessLength();
          } catch (e) {
              process.var.length = 0;
          }

      },
      seek: function(szNameOFCallingFunction,oFilePointer,nOffset){
        console.log("Device seeking for " + szNameOFCallingFunction);
        var process = Processes.findProcessByName(szNameOFCallingFunction);
     //   container.innerHTML += "</br>Seeking "+oFilePointer.accessName();+
                               " offset: "+ nOffset;
        console.log(process.state);
        process.state = "Ready";

        process.program_counter++;

        var currentPosition = oFilePointer.accessPosition();
        var newPosition = currentPosition + nOffset;
        var length = oFilePointer.accessLength();
        if(newPosition >= 0 && newPosition < length){
          oFilePointer.mutatePosition(newPosition);
        }
      },
      capacityReached: function() {

        var currentSize = Directory.Files.reduce(flatten_callback, Directory.Files[0].accessLength());

        return currentSize >= CAPACITY;
      }

    };


var flatten_callback = function (previous, current, index, array){
  if (current instanceof Dir) {
    return current.content.reduce(flatten_callback, previous);
  } else {
    return previous + current.accessLength();
  }
};

