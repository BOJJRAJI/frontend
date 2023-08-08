const DiscussionItem = props => {
  const {element, deleteDiscussion} = props

  const onDeleteDiscussion = () => {
    deleteDiscussion(element.dissId)
  }
  return (
    <>
      <tr>
        <th scope="row" className="td">
          {element.dissId}
        </th>
        <td className="table-column">{element.clientName}</td>
        <td className="table-column">{element.staffName}</td>
        <td className="table-column">{element.discussion}</td>
        <td className="table-column">{element.dateTime}</td>
        <td className="edit-button-container">
          <button
            className="edit-button"
            type="button"
            onClick={onDeleteDiscussion}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default DiscussionItem
