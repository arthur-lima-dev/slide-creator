import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { Button } from 'react-bootstrap'
import Unauthorized from '../../components/Unauthorized'
import { useSession } from 'next-auth/client'
import SpinnerLoading from '../../components/SpinnerLoading'
import { toast } from 'react-toastify'
import { MusicTableProps } from '../../components/MusicTable'

const Create: React.FC<{ props: MusicTableProps }> = ({ props }) => {
  const [session, loading] = useSession();
  const [spinner, showSpinner] = useState(false)

  const [title, setTitle] = useState(props?.title ? props?.title : '')
  const [text, setText] = useState(props?.text ? props?.text : '')
  const [id] = useState(props?.id)

  const submitData = async (e: React.SyntheticEvent) => {
    showSpinner(true)
    e.preventDefault()
    try {
      const body = { id, title, text, userId: (session?.user as any)?.id | 0 }
      const input = id ? `/api/music/${id}` : '/api/music';
      const method = id ? 'PUT' : 'POST';

      await fetch(input, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).finally(() => finallySubmit(method))

    } catch (error) {
      console.error(error)
    }
  }

  const finallySubmit = async (method: string) => {
    showSpinner(false)
    
    if (method === 'PUT') {
      toast.success("Atualizado. Redirecionando...")
     await Router.push('/')
    } else {
      toast.success("Salvo com sucesso. Continue Cadastrando!")
      setTitle('')
      setText('')
    }
  }

  return (
    <Layout>
      {spinner ? (<SpinnerLoading />) : (null)}
      {!loading && !session ? (<Unauthorized />) : (
        <>
          <div>
            <form id='formCreateMusic' onSubmit={submitData}>
              <h1>Nova Música</h1>
              <input
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                type="text"
                value={title}
              />
              <textarea
                cols={50}
                onChange={(e) => setText(e.target.value)}
                placeholder="Conteúdo"
                rows={8}
                value={text}
              />

              <div className="row">
                <div className="col d-flex justify-content-end">
                  <Button variant="success" type="submit" disabled={!text || !title}>
                    Salvar
                  </Button>
                  <Button variant="primary" className="ml-2" onClick={() => Router.push('/')}>
                    Cancelar
                  </Button>
                </div>
              </div>

            </form>
          </div>
          <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
        </>
      )}
    </Layout>
  )
}

export default Create