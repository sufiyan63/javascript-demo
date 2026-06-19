const express = require('express');
const cds = require('@sap/cds');

const router = express.Router();
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;
const BOOKS_ENTITY = 'sap.capire.bookshop.Books';

router.get('/', async (req, res) => {
	try {
		const db = await cds.connect.to('db');
		const books = await db.run(SELECT.from(BOOKS_ENTITY));
		res.json(books);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const db = await cds.connect.to('db');
		await db.run(INSERT.into(BOOKS_ENTITY).entries(req.body));
		res.status(201).json({ message: 'Book created' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const db = await cds.connect.to('db');
		const bookId = Number(req.params.id);

		const result = await db.run(
			UPDATE(BOOKS_ENTITY).set(req.body).where({ ID: bookId })
		);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		return res.json({ message: 'Book updated' });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const db = await cds.connect.to('db');
		const bookId = Number(req.params.id);

		const result = await db.run(
			DELETE.from(BOOKS_ENTITY).where({ ID: bookId })
		);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		return res.json({ message: 'Book deleted' });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;
