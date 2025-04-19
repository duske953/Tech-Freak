import Signup from '@/app/(Auth)/components/Signup';
import Navbar from '@/app/components/Navbar';
import Pagination from '@/app/components/Pagination';

describe('Navbar.cy.tsx', () => {
  it('mounts', () => {
    cy.mount(<Signup />);
  });
});
