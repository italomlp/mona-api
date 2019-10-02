import * as Yup from 'yup';

import Note from '../models/Note';

class NoteController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string()
        .required()
        .min(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { _id, content } = await Note.create({
      ...req.body,
      user: req.userId,
    });

    return res.json({
      _id,
      content,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string()
        .required()
        .min(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { content } = req.body;
    const { id: _id } = req.params;

    const note = await Note.findById(_id);

    if (!note) {
      return res.status(404).json({ error: 'Note does not exists' });
    }

    if (String(note.user) !== String(req.userId)) {
      return res.status(403).json({ error: "User hasn't permission for this" });
    }

    const { updatedAt, createdAt } = await Note.findOneAndUpdate(
      { _id },
      { content },
      { new: true }
    );

    return res.json({
      _id,
      content,
      updatedAt,
      createdAt,
    });
  }

  async show(req, res) {
    const { _id, content, createdAt, updatedAt } = await Note.findById(
      req.params.id
    );

    return res.json({
      _id,
      content,
      createdAt,
      updatedAt,
    });
  }

  async delete(req, res) {
    const { id: _id } = req.params;

    const note = await Note.findById(_id);

    if (!note) {
      return res.status(404).json({ error: 'Note does not exists' });
    }

    await note.update({ removed: true });

    return res.json({ ok: true });
  }

  async index(req, res) {
    const { removed } = req.query;

    const notes = await Note.find({
      user: req.userId,
      removed:
        removed && (removed === 'true' || removed === 'false')
          ? removed
          : false,
    })
      .sort('-updatedAt -createdAt')
      .select('_id createdAt updatedAt content');

    return res.json(notes);
  }
}

export default new NoteController();
