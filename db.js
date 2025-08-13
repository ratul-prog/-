// প্রজেক্ট যোগ করুন
function addProject(title, description, imageUrl, projectUrl) {
  const db = firebase.database();
  const projectsRef = db.ref('projects');
  
  const newProject = {
    title,
    description,
    imageUrl,
    projectUrl,
    createdAt: firebase.database.ServerValue.TIMESTAMP
  };
  
  return projectsRef.push(newProject);
}

// সব প্রজেক্ট লোড করুন
function loadProjects(callback) {
  const db = firebase.database();
  const projectsRef = db.ref('projects');
  
  projectsRef.on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

// প্রজেক্ট ডিলিট করুন
function deleteProject(projectId) {
  const db = firebase.database();
  const projectRef = db.ref(`projects/${projectId}`);
  return projectRef.remove();
}