// import styles from './page.module.css';
import Welcome from '../components/Welcome/Welcome';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex justify-center text-white">
        <Welcome style="mt-32"/>
    </div>

  );

}
