// components/IconItem.jsx
// An orange square with an icon, plus a title and some text next to it.
// Used for "Email Us" boxes and the 3 stats on the home page.
//
// props.icon  = an icon component from lucide-react, for example Mail
// props.title = the bold text
// props.children = the text under the title

function IconItem(props) {
  const Icon = props.icon;

  return (
    <div className="icon-item">
      <div className="icon-square">
        <Icon size={20} />
      </div>

      <div>
        <h4>{props.title}</h4>
        <div className="icon-item-text">{props.children}</div>
      </div>
    </div>
  );
}

export default IconItem;
