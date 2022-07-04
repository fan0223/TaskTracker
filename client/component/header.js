import Link from 'next/link';
export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Create Todo', href: '/todo/new' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link text-white">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-expand-lg navbar-dark p-md-5 ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          To Do
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto"></div>
          <ul className="navbar-nav">
            {links}
            {currentUser && (
              <li key={currentUser.id} className="nav-item ">
                <Link href="#">
                  <a className="nav-link text-white disabled">
                    Hi, {currentUser.email}
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
