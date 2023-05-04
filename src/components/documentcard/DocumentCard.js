import {React} from 'react';
import { Card, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import useModal from "../../hooks/useModal";
import 'react-toastify/dist/ReactToastify.css';
import DetailModal from '../Modals/DetailModal';
import SendModal from '../Modals/SendModal';

export default function DocumentCard({id, title, type}) {
  
  const { isShowing: isDetailShowing, toggle: toggleDetail } = useModal();
  const { isShowing: isSendShowing, toggle: toggleSend } = useModal();

  function openDetailModal() {
    toggleDetail();
  }


  function openSendModal() {
    toggleSend();
  }

  return (
    <>
        <Card style={{ maxWidth: "400px" }}>
            <Card.Header><strong>{type}</strong></Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0" style={{ fontSize: "1em" }}>
                <p>{title}</p>
                <footer className="blockquote-footer" >
                    <Button className='icon' type="button" title="Ouvrir" onClick={() => openDetailModal()}><Icon.PencilSquare/></Button>
                          <Button className='icon icon-send' title="Envoyer" type="button" onClick={() => openSendModal()}><Icon.SendFill /></Button>
                </footer>
                </blockquote>
            </Card.Body>
        </Card>

        {isDetailShowing &&
          <DetailModal
            isShowing={isDetailShowing}
            hide={toggleDetail}
            title={title}
            type={type}
            id={id}
          />
        }

        {isSendShowing &&
          <SendModal
            isShowing={isSendShowing}
            hide={toggleSend}
            title={title}
            type={type}
            id={id}
          />
        }
    </>
  );
}
