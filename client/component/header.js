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

        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">
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
