import { ReactNode, FC } from 'react';
import logo from '@/assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { toggleOpen } from '@/redux/slices/interaction.slice';
import { useAppDispatch, useAppSelector } from '@/hooks';

interface IProps {
	children: ReactNode;
}

export const Header: FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex flex-col w-full">
      <header className="w-full bg-orange-400 text-white h-14 px-4 flex items-center justify-between fixed top-0 z-10">
        <div
          onClick={() => dispatch(toggleOpen())}
          className="md:hidden cursor-pointer text-2xl"
        >
          <GiHamburgerMenu />
        </div>
        <div
          onClick={() => navigate('/')}
          className="font-semibold cursor-pointer h-full flex items-center gap-1"
        >
          <div className="h-full">
            <img className="h-full rounded-full" src={logo} alt="All In" />
          </div>
          <div className="text-xl">All in</div>
        </div>
        <div className="h-full hidden md:flex items-center gap-3 mr-28">
          <div className="text-base">
            {user ? user?.name?.toUpperCase() : 'username'}
          </div>
          <div className="h-full p-2">
            <img
              className="h-full rounded-full"
              src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300x300.jpg"
              alt="user"
            />
          </div>
        </div>
      </header>
      <main className="w-full p-3 mt-14">{children}</main>
    </div>
  );
};

