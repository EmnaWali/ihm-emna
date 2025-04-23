/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './layout'

const Societes = () => {
  const [societes, setSocietes] = useState([])

  const fetchSocietes = async () => {
    try {
      const res = await axios.get('https://localhost:7020/api/AdminSociete/all')
      setSocietes(res.data)
    } catch (err) {
      console.error("Erreur de récupération des sociétés :", err)
    }
  }

  useEffect(() => {
    fetchSocietes()
  }, [])

  const toggleBlock = async (id, isBloqued) => {
    const action = isBloqued ? 'unblock' : 'block'
    const url = `https://localhost:7020/api/AdminSociete/${action}/${id}`

    try {
      await axios.put(url)

      // Mettre à jour localement le statut de la société
      setSocietes(prev =>
        prev.map(s =>
          s.id === id ? { ...s, IsBloqued: !isBloqued } : s
        )
      )
    } catch (error) {
      console.error("Erreur lors du changement de statut :", error)
    }
  }

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center">Liste des Sociétés</h2>
        <p>Le tableau ci-dessous affiche les sociétés avec possibilité de blocage/déblocage :</p>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Raison Sociale</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {societes.map(s => (
              <tr key={s.id}>
                <td>{s.raisonSociale}</td>
                <td>{s.email}</td>
                <td>{s.numTele}</td>
                <td>
                  <span className={`label ${s.IsBloqued ? 'label-danger' : 'label-success'}`}>
                    {s.IsBloqued ? 'Bloquée' : 'Active'}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${s.IsBloqued ? 'btn-success' : 'btn-danger'}`}
                    onClick={() => toggleBlock(s.id, s.IsBloqued)}
                  >
                    {s.IsBloqued ? 'Débloquer' : 'Bloquer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Societes