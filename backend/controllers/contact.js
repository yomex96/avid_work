// controllers/contact.js
import Contact from '../models/Contact.js';
import { sendContactEmail, sendReplyEmail } from '../config/nodemailer.js';

export const submitContactForm = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, message } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB'); 
    const formattedTime = currentDate.toLocaleTimeString('en-GB', { hour12: false }); 

    try {
        const newContact = new Contact({
            firstName,
            lastName,
            phoneNumber,
            email,
            message,
            date: formattedDate, 
            time: formattedTime,
            // isUnread: true,
        });

        await newContact.save();
        await sendContactEmail({ firstName, lastName, phoneNumber, email, message });

        res.status(201).json({ message: 'Contact form submitted successfully.' });
    } catch (error) {
        console.error('Error handling contact form:', error.message, error.stack);
        res.status(500).json({ message: 'There was a problem submitting the contact form.' });
    }
};



export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// export const getAllSummary = async (req, res) => {
//     try {
//         // Fetch all contacts including the isNew field
//         const contacts = await Contact.find({}, 'firstName lastName message date time isNew');

//         const summaries = contacts.map(contact => ({
//             id: contact._id, // Include the contact ID
//             name: `${contact.firstName} ${contact.lastName}`,
//             message: contact.message,
//             "Time Sent": `${contact.date}, ${contact.time}`,
//             isNew: contact.isNew // Include the isNew status
//         }));

//         res.status(200).json(summaries);
//     } catch (error) {
//         console.error('Error retrieving all contact summaries:', error.message);
//         res.status(500).json({ message: 'Failed to retrieve contact summaries.' });
//     }
// };


export const getAllSummary = async (req, res) => {
    try {
        const contacts = await Contact.find({}, 'firstName lastName message date time isUnread');

        const summaries = contacts.map(contact => ({
            id: contact._id, // Include the contact ID
            name: `${contact.firstName} ${contact.lastName}`,
            Unread: contact.isUnread,
            message: contact.message,
            "Time Sent": `${contact.date}, ${contact.time}`
        }));

        res.status(200).json(summaries);
    } catch (error) {
        console.error('Error retrieving all contact summaries:', error.message);
        res.status(500).json({ message: 'Failed to retrieve contact summaries.' });
    }
};

export const deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany();
        res.status(200).json({ message: 'All contacts deleted successfully' });
    } catch (error) {
        console.error('Error deleting all contacts:', error);
        res.status(500).json({ error: 'Error deleting all contacts' });
    }
};


// Assuming you have a Contact model imported
export const deleteContact = async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await Contact.findByIdAndDelete(id); 

        if (!result) {
            return res.status(404).json({ message: 'Contact not found.' }); 
        }

        res.status(200).json({ message: 'Contact deleted successfully.' }); 
    } catch (error) {
        console.error('Error deleting contact:', error.message);
        res.status(500).json({ message: 'Failed to delete contact.' }); 
    }
};

export const markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await Contact.findByIdAndUpdate(id, { isUnread: false }, { new: true });
        
        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message marked as read', contact });
    } catch (error) {
        console.error('Error updating message status:', error.message);
        res.status(500).json({ message: 'Failed to update message status' });
    }
};



export const replyToMessage = async (req, res) => {
    const { id } = req.params; 
    const { message } = req.body; 

    if (!message) {
        return res.status(400).json({ message: 'Reply message is required.' });
    }

    try {
        // Find the original contact message by ID
        const originalMessage = await Contact.findById(id);
        if (!originalMessage) {
            return res.status(404).json({ message: 'Message not found.' });
        }

        // Use the sendEmail utility to send the reply email
        await sendReplyEmail({
            to: originalMessage.email, // User's email
            subject: `Reply to your message from ${originalMessage.firstName} ${originalMessage.lastName}`,
            text: message, // The actual reply content
        });

        res.status(200).json({ message: 'Reply sent successfully.' });
    } catch (error) {
        console.error('Error sending reply:', error.message);
        res.status(500).json({ message: 'There was a problem sending the reply.' });
    }
};



export const getUnreadMessages = async (req, res) => {
    try {
        const unreadMessages = await Contact.find({ isUnread: true }, 'firstName lastName message date time');
        
        res.status(200).json(unreadMessages);
    } catch (error) {
        console.error('Error retrieving unread messages:', error.message);
        res.status(500).json({ message: 'Failed to retrieve unread messages.' });
    }
};


export const getAllMessages = async (req, res) => {
    try {
        const contacts = await Contact.find({}, 'firstName lastName message date time isUnread');
        
        const summaries = contacts.map(contact => ({
            id: contact._id,
            name: `${contact.firstName} ${contact.lastName}`,
            message: contact.message,
            "Time Sent": `${contact.date}, ${contact.time}`,
            isUnread: contact.isUnread, // Include isUnread status
        }));

        res.status(200).json(summaries);
    } catch (error) {
        console.error('Error retrieving all contact summaries:', error.message);
        res.status(500).json({ message: 'Failed to retrieve contact summaries.' });
    }
};







