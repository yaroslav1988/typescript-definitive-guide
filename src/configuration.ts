const {
    VUE_APP_BOOK_CONTENTS_URL,
    VUE_APP_BOOK_CHAPTERS_URL,
    VUE_APP_BOOK_CONTENT_BASE_URL,

    VUE_APP_NOTE_CONTENTS_URL,
    VUE_APP_NOTE_CHAPTERS_URL
} = process.env;

export default {
    book: {
        contents: VUE_APP_BOOK_CONTENTS_URL,
        chapters: VUE_APP_BOOK_CHAPTERS_URL,
        content: VUE_APP_BOOK_CONTENT_BASE_URL
    },
    note: {
        contents: VUE_APP_NOTE_CONTENTS_URL,
        chapters: VUE_APP_NOTE_CHAPTERS_URL
    }
};
