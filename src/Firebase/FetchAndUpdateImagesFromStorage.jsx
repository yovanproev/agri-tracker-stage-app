import { storage, storageRef } from './Firebase.utils';

export async function getNamesOfImages (idOfSelectField) {
  return new Promise((resolve, reject)=>{
  let arrayOfNames = []
  
  const folder = idOfSelectField === 1 ? 'tractorImages' : 
  idOfSelectField === 2 ? 'attachedMachinery' : null
  
  if (idOfSelectField === 1 || idOfSelectField === 2) 
  storage.ref().child(folder).listAll().then(res => {
    res.items.forEach((itemRef) => {
      arrayOfNames.push(itemRef.name)
      resolve(arrayOfNames)
    });
  }).catch(err => {
    reject(err)
  })
  })
}
       
export async function getImage(id, value, allNamesOfImages, nameOfElement) {
   return new Promise((resolve, reject)=>{
    const urlDev = 'gs://input-output-data.appspot.com/'
    
    let folderArray = ['tractorImages/', 'attachedMachinery/']
    let imageArray = []   
    imageArray.push(allNamesOfImages) 
    //  console.log(allNamesOfImages)
    const filterImagesToExactElement = imageArray[0]?.filter((el) => el === nameOfElement + ".jpg")
    // console.log(filterImagesToExactElement)
    if (id === 1 || id === 2) {
      if (value !== 0 && id === 1) {
        if (filterImagesToExactElement)
     storage.refFromURL(urlDev + folderArray[id - 1] + filterImagesToExactElement[0])
       .getDownloadURL().then((url) => {
        resolve(url)
       }).catch(err => {
        reject(err)
      })}
     else if (value !== 0 && id === 2) {
      if (filterImagesToExactElement)
          storage.refFromURL(urlDev + folderArray[id - 1] + filterImagesToExactElement[0])
        .getDownloadURL().then((url) => {
          resolve(url)
        }).catch(err => {
          reject(err)
        }) 
      }
    }
  })
}

export async function attachImagetoStorage(selectFieldId, newImage, imageName, hideModal) {
  return new Promise((resolve, reject)=>{
let folderPath = selectFieldId === 1 ? 'tractorImages' : 'attachedMachinery'
  // let imageName = /[^\\/]*$/.exec(newImage)[0]
  storageRef.child(folderPath + "/" + imageName).put(newImage)
  .on('state_changed', function(snapshot){
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    if (parseInt(progress) === 100) hideModal()
    switch (snapshot.state) {
      // case storage.TaskState.PAUSED: // or 'paused'
      //   console.log('Upload is paused');
      //   break;
      // case storage.TaskState.RUNNING: // or 'running'
      //   console.log('Upload is running');
      //   break;
      default: 
    }
  }, function(error) {
    console.log('unsuccessfull', error);
  }, function() {
  })
  
   resolve()
  })
}