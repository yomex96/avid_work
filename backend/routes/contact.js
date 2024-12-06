// routes/contact.js
import express from 'express';
import {
    submitContactForm,
    getAllContacts,
    getAllSummary,
    deleteAllContacts,
    deleteContact,
    getAllMessages, 
    getUnreadMessages, 
    replyToMessage,
    markAsRead,
    // deleteContactsByEmail,
} from '../controllers/contact.js';

const router = express.Router();

router.post('/', submitContactForm);
router.get('/summary', getAllSummary);
router.get('/', getAllContacts);


router.delete('/:id',  deleteContact);

router.delete('/', deleteAllContacts);

router.post('/reply/:id', replyToMessage);



// Route to get only unread messages
router.get('/messages/unread', getUnreadMessages);

// Route to mark a specific message as read (requires message ID as a parameter)
router.patch('/messages/:id/read', markAsRead);


// Route to get all messages
router.get('/messages', getAllMessages);

// router.delete('/email/:email', deleteContactsByEmail);

export default router;













