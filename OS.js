var OS = {
  FS: {
    pwd: "",

    create: function (szFileName, szContent) {
      //Processes.listOfDevices[0].create(szFileName,szContent);
      console.log("In Create");
      var process = Processes.findProcessByName(OS.FS.create.caller.displayName);
      //   container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].create,
          OS.FS.create.caller,
          [OS.FS.create.caller.displayName, szFileName, szContent]
        )
      );
      OS.Scheduler.runNextProcess();
      //OS.ProcessQueue.dequeue();
      //Processes.listOfDevices['file_io'].main();
    },
    copy: function(szFileName){
      console.log("In Copy");
      var process = Processes.findProcessByName(OS.FS.copy.caller.displayName);
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
          OS.ProcessQueue.wrapFunction(
              Processes.listOfDevices['file_io'].copy,
              OS.FS.copy.caller,
              [OS.FS.copy.caller.displayName, szFileName]
          )
      );
      OS.Scheduler.runNextProcess();
    },
    delete: function (szFileName) {
      //Processes.listOfDevices['file_io'].delete(szFileName);
      console.log("In Delete");
      var process = Processes.findProcessByName(OS.FS.delete.caller.displayName);
      //  container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].delete,
          OS.FS.delete.caller,
          [OS.FS.delete.caller.displayName, szFileName]
        )
      );
      OS.Scheduler.runNextProcess();
      //Processes.listOfDevices['file_io'].main();
    },
    open: function (szFileName) {
      //return Processes.listOfDevices['file_io'].open(szFileName);
      console.log("In Open");
      var process = Processes.findProcessByName(OS.FS.open.caller.displayName);
      //    container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].open,
          OS.FS.open.caller,
          [OS.FS.open.caller.displayName, szFileName]
        )
      );
      return OS.Scheduler.runNextProcess();
      //return Processes.listOfDevices['file_io'].main();
    },
    close: function (szFileName) {
      //Processes.listOfDevices['file_io'].close(szFileName);
      console.log("In Close");
      var process = Processes.findProcessByName(OS.FS.close.caller.displayName);
      //   container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].close,
          OS.FS.close.caller,
          [OS.FS.close.caller.displayName, szFileName]
        )
      );
      OS.Scheduler.runNextProcess();
      //Processes.listOfDevices['file_io'].main();
    },
    read: function (oFilePointer) {
      //return Processes.listOfDevices['file_io'].read(oFilePointer);
      console.log("In Read");
      var process = Processes.findProcessByName(OS.FS.read.caller.displayName);
      //container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].read,
          OS.FS.read.caller,
          [OS.FS.read.caller.displayName, oFilePointer]
        )
      );
      return OS.Scheduler.runNextProcess();
      //return Processes.listOfDevices['file_io'].main();
    },
    write: function (oFilePointer, szInput) {
      //Processes.listOfDevices['file_io'].write(oFilePointer,szInput);
      console.log("In Write");
      var process = Processes.findProcessByName(OS.FS.write.caller.displayName);
      //   container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].write,
          OS.FS.write.caller,
          [OS.FS.write.caller.displayName, oFilePointer, szInput]
        )
      );
      OS.Scheduler.runNextProcess();
      //Processes.listOfDevices['file_io'].main();
    },
    position: function (oFilePointer) {
      //return Processes.listOfDevices['file_io'].position(oFilePointer);
      console.log("In Position");
      var process = Processes.findProcessByName(OS.FS.position.caller.displayName);
      //    container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].position,
          OS.FS.position.caller,
          [OS.FS.position.caller.displayName, oFilePointer]
        )
      );
      return OS.Scheduler.runNextProcess();
      //return Processes.listOfDevices['file_io'].main();
    },
    length: function (oFilePointer) {
      //return Processes.listOfDevices['file_io'].length(oFilePointer);
      console.log("In length");
      console.log(oFilePointer);
      var process = Processes.findProcessByName(OS.FS.length.caller.displayName);
      //    container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].lengthOfFile,
          OS.FS.length.caller,
          [OS.FS.length.caller.displayName, oFilePointer]
        )
      );
      return OS.Scheduler.runNextProcess();
      //return Processes.listOfDevices['file_io'].main();
    },
    seek: function (oFilePointer, nOffset) {
      //Processes.listOfDevices['file_io'].seek(oFilePointer,nOffset);
      console.log("In seek");
      var process = Processes.findProcessByName(OS.FS.seek.caller.displayName);
      //     container.innerHTML += "</br> Adding "+ process.name + " to queue";
      process.state = "Waiting";
      OS.ProcessQueue.enqueue(
        OS.ProcessQueue.wrapFunction(
          Processes.listOfDevices['file_io'].seek,
          OS.FS.seek.caller,
          [OS.FS.seek.caller.displayName, oFilePointer, nOffset]
        )
      );
      OS.Scheduler.runNextProcess();
      //Processes.listOfDevices['file_io'].main();
    },
    getPwd: function(){
      return OS.FS.pwd;
    },
    setPwd: function(oNewPath){
      OS.FS.pwd = oNewPath;
      console.log("Current working directory changed to: " + oNewPath);
      return;
    },
    getPwdTopLevel: function(){
      this.szCurrentDirName = "";
      this.oCurrentDir = OS.FS.getPwd();
      if(this.oCurrentDir == Directory.Files){
        return "/";
      }
      else{
        console.log(this.oCurrentDir);
        if(this.oCurrentDir != Directory.Files && this.oCurrentDir != undefined){
          return this.oCurrentDir.name;
        }
        else{
          return "/";
        }

      }
    },
    getPwdText: function(){
      this.oCurrentDir = OS.FS.getPwd();
      console.log(this.oCurrentDir);
      this.aryPathConstructor = new Array();
      this.szFullyQualifiedPath = "";
      if(this.oCurrentDir == Directory.Files){
        return this.aryPathConstructor.push("/");
      }
      else{
        while(this.oCurrentDir != Directory.Files){
          console.log(this.oCurrentDir);
          this.aryPathConstructor.push(this.oCurrentDir.name);
          this.oCurrentDir = this.oCurrentDir.parentDir;
        }
      }


      for (var n = this.aryPathConstructor.length - 1; n >= 0; n--){
        console.log(this.aryPathConstructor.length + " " + n);
        console.log(this.aryPathConstructor[n]);
        this.szFullyQualifiedPath += this.aryPathConstructor[n];
        this.szFullyQualifiedPath += "/";
      }
      return this.szFullyQualifiedPath;
    },
    getDirectory: function(szPath){

      var current_position_in_fs = this.getPwd();
      var directories_in_path = szPath.split("/");

      var recursive_directory_search = function (fs_element, index, directory_tree) {
        if (fs_element.fileType == "Directory"){
          if (fs_element.name == name){
            oCurrentDir = fs_element;
          } else {
            fs_element.content.forEach(recursive_directory_search);
          }
        }
      }
      var oCurrentDir = undefined;
      var name = directories_in_path.pop();
      directories_in_path = directories_in_path.concat(name);
      switch (directories_in_path[0]) {
        case "":
          if (directories_in_path.length > 1) {
            current_position_in_fs.forEach(recursive_directory_search);
            return oCurrentDir;
          } else {
            return Directory.Files;
          }
        case ".":
          if (directories_in_path.length > 1) {
            current_position_in_fs.forEach(recursive_directory_search);
            return oCurrentDir;
          } else {
            return this.getPwd();
          }
        case "..":
          if (directories_in_path.length > 1) {
            current_position_in_fs.forEach(recursive_directory_search);
            return oCurrentDir;
          } else {
            return this.getPwd().getParent();
          }
      }

    }
  },
  display: function (output) {
    Processes.listOfDevices['display'].main(output);
  },
  clearScreen: function () {
    Processes.listOfDevices['display'].clear();
  },
  outputToConsole: function () {
    Processes.listOfDevices['display'].outputToConsole();
  },
  ProcessQueue: {
    queue: [],
    wrapFunction: function (fn, context, params) {
      return function () {
        return fn.apply(context, params);
      }
    },
    enqueue: function (func) {
      OS.ProcessQueue.queue.push(func);
    },
    dequeue: function () {
      //var fn = OS.ProcessQueue.queue.shift();
      //return fn();
      return OS.ProcessQueue.queue.shift()();
    }
  },
  checkAccess: function(currUser, file)
  {
    //returns true if the userObj is in the access group of the file.
    //returns false if the userOb is not in the access group of the file.

    //Check the currentUser.name against the access group names.
    var flag = false;
    file.accessGroup.forEach(function(element,index,array){
      if(element == currUser.getUserName())
      {
        flag = true;
      }
    });
    return flag;
  },
  mutexLock: {
    //basically locking it
    acquire: function(mutex) {

      var find = true;
      while (find == true) {
        if (arrayOfMutexes.length > 0) { //only run if there's something in the array
          arrayOfMutexes.forEach(function (element, index, array) {
            if (mutex.accessFileName() == arrayOfMutexes[index].accessFileName()) { //checks if it's already locked
              //console.log("they're the same");
              console.log("2 gets sent to the abyss");
              arrayOfWaiting.push(mutex);
              find = false;
            }
          });

          if (find == true) {  //only runs if none were found to be locked
            //it only arrives here if it wasn't found in the array
            console.log("3");
            arrayOfMutexes.push(mutex);
            mutex.setAvailable(false);
            find = false;
          }
        }
        else {
          console.log("1");
          arrayOfMutexes.push(mutex);
          mutex.setAvailable(false);
          find = false;
        }
      }
    },

    //obviously unlocking it
    release: function(mutex) {
      arrayOfMutexes.forEach(function (element, index, array) {
        if (arrayOfMutexes[index] == mutex) {
          arrayOfMutexes.splice(index, 1);
          mutex.setAvailable(true);

          //checks if it needs to be relocked
          arrayOfWaiting.forEach(function (element, index, array) {
            if (arrayOfWaiting[index].accessFileName() == mutex.accessFileName()) {
              arrayOfMutexes.push(arrayOfWaiting[index]); //it relocks it
              arrayOfWaiting.splice(index, 1); //removes it from waiting to be locked
            }
          });

        }
      });
    }
  },

  semaphores: {
    wait: function(sema) {
      if(sema.accessSynchNum() != 0){
        var tempSynch = sema.accessSynchNum();
        sema.setSynchNum(--tempSynch);
      }
    },

    signal: function(sema) {

      var tempSynch = sema.accessSynchNum();
      sema.setSynchNum(++tempSynch);

      // call the next in the queue and remember to shift back and push itself to the end of the queue
    }
  },

  //******** the error is with users? that bracket?
  Users: [],

  //Maybe I don't need the newUserName and password I just use the userObject they are passed in.
  UserSwap: function(userObject)
  {
    var userNameFlag = false;
    var passwordFlag = false;
    var access = false;

    //This check may not be necessary since we do it in the switch user process, but it's safe to keep it here I guess.
    //check if the user name is in the OS.Users array on the OS.
    //check if the password is correct.
    OS.Users.forEach(function(element,index,array){
        if(element.getUserName() == userObject.getUserName())
        {
          userNameFlag = true;
        }

        if(element.getPassword() == userObject.getPassword())
        {
          passwordFlag = true;
        }
    });

    if(userNameFlag == true && passwordFlag == true)
    {
      access = true;
    }

    //if the userName is different than what is already in the singleton, and the username exists on the OS
    //replace the
    if(CurrentUserSingleton.getInstance().getUserName() != userObject.getUserName() && access == true)
    {
      CurrentUserSingleton.setInstance(userObject);
    }
  }
}

