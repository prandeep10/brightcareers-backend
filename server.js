const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('images')); // Serve images from 'images' directory

// For Gallery Section 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

let images = require('./images.json');

// Get all images
app.get('/images', (req, res) => {
  res.json(images);
});

// Get individual image
app.get('/images/:id', (req, res) => {
  const imageId = parseInt(req.params.id);
  const image = images.find(img => img.id === imageId);
  if (image) {
    res.sendFile(path.join(__dirname, 'images', image.filename));
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});

// Upload an image
app.post('/images', upload.single('image'), (req, res) => {
  const newImage = {
    id: images.length > 0 ? images[images.length - 1].id + 1 : 1,
    filename: req.file.filename,
    originalname: req.file.originalname,
    url: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
  };

  images.push(newImage);
  fs.writeFileSync('./images.json', JSON.stringify(images, null, 2));

  res.json(newImage);
});

// Delete an image
app.delete('/images/:id', (req, res) => {
  const imageId = parseInt(req.params.id);
  const imageIndex = images.findIndex(img => img.id === imageId);

  if (imageIndex !== -1) {
    const deletedImage = images.splice(imageIndex, 1)[0];
    fs.unlinkSync(path.join(__dirname, 'images', deletedImage.filename));
    fs.writeFileSync('./images.json', JSON.stringify(images, null, 2));
    res.json(deletedImage);
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});


// Gallery Ends Here 






// Students 
app.use('/students', express.static('students')); // Serve student images from 'students' directory

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'students/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload1 = multer({ storage: storage1 });

let students = require('./students.json');

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Get individual student
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(student => student.id === studentId);
  if (student) {
    res.sendFile(path.join(__dirname, 'students', student.image));
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// Add a new student
app.post('/students', upload1.single('image'), (req, res) => {
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    percentage: req.body.percentage,
    image: req.file.filename
  };

  students.push(newStudent);
  fs.writeFileSync('./students.json', JSON.stringify(students, null, 2));

  res.json(newStudent);
});

// Update a student
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(student => student.id === studentId);

  if (studentIndex !== -1) {
    students[studentIndex].name = req.body.name || students[studentIndex].name;
    students[studentIndex].percentage = req.body.percentage || students[studentIndex].percentage;
    fs.writeFileSync('./students.json', JSON.stringify(students, null, 2));
    res.json(students[studentIndex]);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(student => student.id === studentId);

  if (studentIndex !== -1) {
    const deletedStudent = students.splice(studentIndex, 1)[0];
    fs.unlinkSync(path.join(__dirname, 'students', deletedStudent.image));
    fs.writeFileSync('./students.json', JSON.stringify(students, null, 2));
    res.json(deletedStudent);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});



// Students End Here 






// Faculty Starts 
app.use('/faculty', express.static('faculty')); // Serve faculty images from 'faculty' directory

const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'faculty/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload3 = multer({ storage: storage3 });

let faculty = require('./faculty.json');

// Get all faculty members
app.get('/faculty', (req, res) => {
  res.json(faculty);
});

// Get individual faculty member
app.get('/faculty/:id', (req, res) => {
  const facultyId = parseInt(req.params.id);
  const facultyMember = faculty.find(member => member.id === facultyId);
  if (facultyMember) {
    res.sendFile(path.join(__dirname, 'faculty', facultyMember.image));
  } else {
    res.status(404).json({ error: 'Faculty member not found' });
  }
});

// Add a new faculty member
app.post('/faculty', upload3.single('image'), (req, res) => {
  const newFacultyMember = {
    id: faculty.length > 0 ? faculty[faculty.length - 1].id + 1 : 1,
    name: req.body.name,
    image: req.file.filename,
    subject: req.body.subject,
    description: req.body.description
  };

  faculty.push(newFacultyMember);
  fs.writeFileSync('./faculty.json', JSON.stringify(faculty, null, 2));

  res.json(newFacultyMember);
});

// Update a faculty member
app.put('/faculty/:id', (req, res) => {
  const facultyId = parseInt(req.params.id);
  const facultyIndex = faculty.findIndex(member => member.id === facultyId);

  if (facultyIndex !== -1) {
    faculty[facultyIndex].name = req.body.name || faculty[facultyIndex].name;
    faculty[facultyIndex].subject = req.body.subject || faculty[facultyIndex].subject;
    faculty[facultyIndex].description = req.body.description || faculty[facultyIndex].description;
    fs.writeFileSync('./faculty.json', JSON.stringify(faculty, null, 2));
    res.json(faculty[facultyIndex]);
  } else {
    res.status(404).json({ error: 'Faculty member not found' });
  }
});

// Delete a faculty member
app.delete('/faculty/:id', (req, res) => {
  const facultyId = parseInt(req.params.id);
  const facultyIndex = faculty.findIndex(member => member.id === facultyId);

  if (facultyIndex !== -1) {
    const deletedFacultyMember = faculty.splice(facultyIndex, 1)[0];
    fs.unlinkSync(path.join(__dirname, 'faculty', deletedFacultyMember.image));
    fs.writeFileSync('./faculty.json', JSON.stringify(faculty, null, 2));
    res.json(deletedFacultyMember);
  } else {
    res.status(404).json({ error: 'Faculty member not found' });
  }
});








// Faculty Ends







// Founders 
app.use('/founders', express.static('founders')); // Serve founder images from 'founders' directory

const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'founders/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload4 = multer({ storage: storage4 });

let founders = require('./founders.json');

// Get all founders
app.get('/founders', (req, res) => {
  res.json(founders);
});

// Get individual founder
app.get('/founders/:id', (req, res) => {
  const founderId = parseInt(req.params.id);
  const founder = founders.find(founder => founder.id === founderId);
  if (founder) {
    res.sendFile(path.join(__dirname, 'founders', founder.image));
  } else {
    res.status(404).json({ error: 'Founder not found' });
  }
});

// Add a new founder
app.post('/founders', upload4.single('image'), (req, res) => {
  const newFounder = {
    id: founders.length > 0 ? founders[founders.length - 1].id + 1 : 1,
    name: req.body.name,
    image: req.file.filename,
    description: req.body.description
  };

  founders.push(newFounder);
  fs.writeFileSync('./founders.json', JSON.stringify(founders, null, 2));

  res.json(newFounder);
});

// Update a founder
app.put('/founders/:id', (req, res) => {
  const founderId = parseInt(req.params.id);
  const founderIndex = founders.findIndex(founder => founder.id === founderId);

  if (founderIndex !== -1) {
    founders[founderIndex].name = req.body.name || founders[founderIndex].name;
    founders[founderIndex].description = req.body.description || founders[founderIndex].description;
    fs.writeFileSync('./founders.json', JSON.stringify(founders, null, 2));
    res.json(founders[founderIndex]);
  } else {
    res.status(404).json({ error: 'Founder not found' });
  }
});

// Delete a founder
app.delete('/founders/:id', (req, res) => {
  const founderId = parseInt(req.params.id);
  const founderIndex = founders.findIndex(founder => founder.id === founderId);

  if (founderIndex !== -1) {
    const deletedFounder = founders.splice(founderIndex, 1)[0];
    fs.unlinkSync(path.join(__dirname, 'founders', deletedFounder.image));
    fs.writeFileSync('./founders.json', JSON.stringify(founders, null, 2));
    res.json(deletedFounder);
  } else {
    res.status(404).json({ error: 'Founder not found' });
  }
});





// Founders End 

// Load initial data from text.json
let textData = require('./text.json');

// Get all text data
app.get('/text', (req, res) => {
  res.json(textData);
});

// Update text data
app.put('/text', (req, res) => {
  // Update the text data with the request body
  textData = { ...textData, ...req.body };

  // Write the updated text data back to text.json
  fs.writeFile('./text.json', JSON.stringify(textData, null, 2), (err) => {
    if (err) {
      console.error('Error updating text.json:', err);
      res.status(500).json({ error: 'Failed to update text data' });
    } else {
      console.log('text.json updated successfully');
      res.json(textData);
    }
  });
});





const messagesFilePath = path.join(__dirname, 'messages.json');

// Messages 
// Endpoint to handle POST requests with name, email, and message
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    // Perform validation (optional)
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
  
    // Create a new message object
    const newMessage = { name, email, message, timestamp: new Date() };
  
    // Read existing messages from messages.json
    let messages = [];
    try {
      const data = fs.readFileSync(messagesFilePath);
      messages = JSON.parse(data);
    } catch (error) {
      console.error('Error reading messages file:', error);
    }
  
    // Add the new message to the messages array
    messages.push(newMessage);
  
    // Write updated messages back to messages.json
    try {
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
    } catch (error) {
      console.error('Error writing messages file:', error);
      return res.status(500).json({ error: 'Failed to save message' });
    }
  
    // Send a response back to the client
    res.status(200).json({ success: true, message: 'Message received successfully' });
  });
  
  // Endpoint to retrieve all messages
  app.get('/messages', (req, res) => {
    let messages = [];
    try {
      const data = fs.readFileSync(messagesFilePath);
      messages = JSON.parse(data);
    } catch (error) {
      console.error('Error reading messages file:', error);
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
    res.json(messages);
  });
  
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
