
// Email structure:
// {
//     id: utilService.makeId(),
//     subject: 'Wassap?',
//     body: 'Pick up!',
//     sentAt: Date.now(),
//     removedAt: null,
//     from: 'getUser().email',
//     to: 'john@gmail',
//    status: 'inbox',
//     isRead: false,
//     isStarred: false,
//     labels: []
// }

export function MailPreview({ mail }) {
    return (
        <li className="mail-preview">
            <span>
                <i className="fa-solid fa-star"></i>
            </span>
            <div className="main-mail-container">
                <span className="mail-from">{mail.from}</span>
                <span className="mail-subject">{mail.subject}</span>
                <span className="mail-seperator">-</span>
                <span className="mail-body">{mail.body}</span>
            </div>
            <span className="mail-sent-at">{mail.sentAt}</span>
        </li>
    )
}