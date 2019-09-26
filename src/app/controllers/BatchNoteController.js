import Note from '../models/Note';

class BatchNoteController {
  async deleteMany(req, res) {
    const { notes: notesIds } = req.body;

    await Note.updateMany(
      {
        user: req.userId,
        _id: { $in: notesIds },
        removed: false,
      },
      {
        removed: true,
      }
    );

    return res.json({ ok: true });
  }

  async recoverAll(req, res) {
    await Note.updateMany(
      {
        user: req.userId,
        removed: true,
      },
      {
        removed: false,
      }
    );

    return res.json({ ok: true });
  }

  async recoverMany(req, res) {
    const { notes: notesIds } = req.body;

    await Note.updateMany(
      {
        user: req.userId,
        _id: { $in: notesIds },
        removed: true,
      },
      {
        removed: false,
      }
    );

    return res.json({ ok: true });
  }

  // clear trash
  async deleteDefinitelyAll(req, res) {
    await Note.deleteMany({ user: req.userId, removed: true });

    return res.json({ ok: true });
  }

  async deleteDefinitelyMany(req, res) {
    const { notes: notesIds } = req.body;

    await Note.deleteMany({
      user: req.userId,
      _id: { $in: notesIds },
      removed: true,
    });

    return res.json({ ok: true });
  }
}

export default new BatchNoteController();
