import Avatar4 from "../../assets/images/xs/avatar4.jpg";
import Avatar5 from "../../assets/images/xs/avatar5.jpg";
import Avatar2 from "../../assets/images/xs/avatar2.jpg";
import Avatar1 from "../../assets/images/xs/avatar1.jpg";
import Avatar3 from "../../assets/images/xs/avatar3.jpg";

const FollowersCard = ({ headerText = "Who to follow" }) => {
  const followers = [
    {
      name: "Chris Fox",
      role: "Designer, Blogger",
      status: "online",
      img: Avatar4,
    },
    {
      name: "Joge Lucky",
      role: "Java Developer",
      status: "online",
      img: Avatar5,
    },
    {
      name: "Isabella",
      role: "CEO, Thememakker",
      status: "offline",
      img: Avatar2,
    },
    {
      name: "Folisise Chosielie",
      role: "Art director, Movie Cut",
      status: "offline",
      img: Avatar1,
    },
    {
      name: "Alexander",
      role: "Writter, Mag Editor",
      status: "online",
      img: Avatar3,
    },
  ];

  return (
    <div className="card">
      <div className="header">
        <h2>{headerText}</h2>
      </div>
      <div className="body">
        <form>
          <div className="input-group m-b-20">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="icon-magnifier"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </form>
        <ul className="right_chat list-unstyled">
          {followers.map((contact, idx) => (
            <li key={idx} className={contact.status}>
              <a href="/profile">
                <div className="media">
                  <img className="media-object " src={contact.img} alt="" />
                  <div className="media-body">
                    <span className="name">{contact.name}</span>
                    <span className="message">{contact.role}</span>
                    <span className="badge badge-outline status"></span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersCard;
