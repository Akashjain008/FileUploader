import { render, screen } from '@testing-library/react';
import Fileuploader from './Fileuploader.component';

test('renders file uploader', () => {
    render(<Fileuploader />);
    const linkElement = screen.getByText(/file upload/i);
    expect(linkElement).toBeInTheDocument();
});
