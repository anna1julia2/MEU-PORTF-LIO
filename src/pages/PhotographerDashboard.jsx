import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Film, PlusCircle, CheckCircle2, Clock, XCircle, User, Settings, Layers, DollarSign, Image as ImageIcon, Send, Sparkles } from 'lucide-react';

const PhotographerDashboard = () => {
  const { user, portfolioItems, bookings, addPortfolioItem, updateBookingStatus } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState('add_portfolio');

  // New Portfolio Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Ensaios');
  const [newMediaType, setNewMediaType] = useState('image');
  const [newMediaUrl, setNewMediaUrl] = useState('/hero_photography.png');
  const [newVideoEmbed, setNewVideoEmbed] = useState('');
  const [newPrice, setNewPrice] = useState('1500');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('Fine Art, Retrato, Exclusivo');
  const [newExif, setNewExif] = useState('85mm | f/1.4 | ISO 100');

  // Filter photographer's own portfolio items and booking requests
  const myPortfolios = portfolioItems.filter(item => item.photographerId === user?.id || item.photographerName === user?.name);
  const myBookings = bookings.filter(b => b.photographerId === user?.id || b.photographerName === user?.name);

  const handlePublishPortfolio = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    addPortfolioItem({
      title: newTitle,
      category: newCategory,
      mediaType: newMediaType,
      mediaUrl: newMediaUrl || '/hero_photography.png',
      videoEmbed: newMediaType === 'video' ? (newVideoEmbed || 'https://www.youtube.com/embed/ScMzIvxBSi4') : '',
      description: newDescription || 'Ensaio fotográfico de alta resolução cadastrado no portfólio.',
      tags: newTags.split(',').map(t => t.trim()),
      priceEstimate: parseFloat(newPrice) || 1200,
      exif: newExif
    });

    // Reset Form
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div style={{ padding: '3rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Dashboard Top Header */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <img
                src={user?.avatar}
                alt={user?.name}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-gold)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                    {user?.name}
                  </h1>
                  <span className="badge badge-gold">Fotógrafo Pro</span>
                </div>
                <p style={{ color: 'var(--accent-gold-light)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {user?.title || 'Especialista em Ensaios & Cinema 4K'}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {user?.location || 'São Paulo, SP'}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ padding: '0.8rem 1.4rem', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold-light)' }}>{myPortfolios.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Publicações</div>
              </div>
              <div style={{ padding: '0.8rem 1.4rem', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{myBookings.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Orçamentos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setActiveSubTab('add_portfolio')}
            style={{
              padding: '0.7rem 1.3rem',
              borderRadius: '12px',
              border: activeSubTab === 'add_portfolio' ? '1px solid var(--accent-gold)' : '1px solid transparent',
              background: activeSubTab === 'add_portfolio' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
              color: activeSubTab === 'add_portfolio' ? 'var(--accent-gold-light)' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <PlusCircle size={18} />
            <span>Publicar Novo Portfólio</span>
          </button>

          <button
            onClick={() => setActiveSubTab('my_bookings')}
            style={{
              padding: '0.7rem 1.3rem',
              borderRadius: '12px',
              border: activeSubTab === 'my_bookings' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              background: activeSubTab === 'my_bookings' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: activeSubTab === 'my_bookings' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Clock size={18} />
            <span>Solicitações de Clientes ({myBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('my_gallery')}
            style={{
              padding: '0.7rem 1.3rem',
              borderRadius: '12px',
              border: activeSubTab === 'my_gallery' ? '1px solid var(--accent-gold)' : '1px solid transparent',
              background: activeSubTab === 'my_gallery' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
              color: activeSubTab === 'my_gallery' ? 'var(--accent-gold-light)' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Layers size={18} />
            <span>Meus Ensaio Publicados ({myPortfolios.length})</span>
          </button>
        </div>

        {/* SUBTAB 1: Publish New Portfolio Form */}
        {activeSubTab === 'add_portfolio' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlusCircle size={22} color="#d4af37" /> Publicar Ensaio / Vídeo no Seu Portfólio
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Adicione fotos ou produções de vídeo de alta resolução para atrair novos clientes na vitrine principal.
            </p>

            <form onSubmit={handlePublishPortfolio}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                <div className="form-group">
                  <label>Título do Ensaio / Produção</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ensaio Editorial Sunset Luxo"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-control"
                  >
                    <option value="Ensaios">Ensaios Femininos & Portfólio</option>
                    <option value="Filmagens">Filmagens & Cinema 4K</option>
                    <option value="Casamentos">Casamentos & Pré-Wedding</option>
                    <option value="Moda">Moda & Editorial Urban</option>
                    <option value="Corporativo">Corporativo & Perfil Pro</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div className="form-group">
                  <label>Tipo de Mídia</label>
                  <select
                    value={newMediaType}
                    onChange={(e) => setNewMediaType(e.target.value)}
                    className="form-control"
                  >
                    <option value="image">📸 Fotografia (Imagem High-Res)</option>
                    <option value="video">🎥 Videomaker / Teaser 4K (Vídeo)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Estimativa de Valor Mínimo (R$)</label>
                  <input
                    type="number"
                    placeholder="1500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>URL da Imagem de Capa / Destaque</label>
                <select
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="form-control"
                >
                  <option value="/hero_photography.png">Golden Hour Portrait (Gerada)</option>
                  <option value="/wedding_shoot.png">Ensaio Casamento Sunset (Gerada)</option>
                  <option value="/fashion_shoot.png">Fashion Cyber Urban (Gerada)</option>
                  <option value="/cinema_shoot.png">Cinema Studio 4K Set (Gerada)</option>
                  <option value="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80">Wedding Romance Unsplash HD</option>
                  <option value="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80">Fine Art Model Unsplash HD</option>
                </select>
              </div>

              {newMediaType === 'video' && (
                <div className="form-group">
                  <label>URL de Embed do Vídeo (YouTube / Vimeo)</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/embed/ScMzIvxBSi4"
                    value={newVideoEmbed}
                    onChange={(e) => setNewVideoEmbed(e.target.value)}
                    className="form-control"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Descrição do Trabalho</label>
                <textarea
                  rows="3"
                  placeholder="Conte os detalhes do ensaio, iluminação utilizada, localização e conceito..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div className="form-group">
                  <label>Tags (separadas por vírgula)</label>
                  <input
                    type="text"
                    placeholder="Golden Hour, Fine Art, Studio, Sony A7R"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Dados EXIF / Câmera (Opcional)</label>
                  <input
                    type="text"
                    placeholder="85mm | f/1.4 | ISO 100"
                    value={newExif}
                    onChange={(e) => setNewExif(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <Sparkles size={18} />
                <span>Publicar Portfólio na Plataforma</span>
              </button>
            </form>
          </div>
        )}

        {/* SUBTAB 2: Booking Requests */}
        {activeSubTab === 'my_bookings' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
              Solicitações de Orçamento & Contratação Recebidas
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Gerencie os pedidos enviados pelos clientes interessados no seu estilo.
            </p>

            {myBookings.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Nenhuma solicitação de orçamento recebida até o momento.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {myBookings.map(b => (
                  <div
                    key={b.id}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                          {b.clientName}
                        </span>
                        <span className={`badge ${b.status === 'Aprovado' ? 'badge-gold' : b.status === 'Recusado' ? 'badge-purple' : 'badge-cyan'}`}>
                          {b.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.88rem', color: 'var(--accent-gold-light)', fontWeight: 600, marginBottom: '0.3rem' }}>
                        {b.serviceType}
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '1.2rem' }}>
                        <span>📅 Data Pretendida: <strong>{b.date}</strong></span>
                        <span>📍 Local: <strong>{b.location}</strong></span>
                        <span>💰 Proposta: <strong>{b.budgetEstimate}</strong></span>
                      </div>

                      {b.notes && (
                        <div style={{ marginTop: '0.8rem', fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.8rem', borderRadius: '8px' }}>
                          "{b.notes}"
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {b.status === 'Pendente' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Aprovado')}
                            className="btn btn-primary btn-sm"
                          >
                            <CheckCircle2 size={16} /> Aceitar
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Recusado')}
                            className="btn btn-outline btn-sm"
                            style={{ color: '#ef4444' }}
                          >
                            <XCircle size={16} /> Recusar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: Published Portfolios */}
        {activeSubTab === 'my_gallery' && (
          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem' }}>
              Seus Ensaios Publicados na Plataforma
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {myPortfolios.map(item => (
                <div key={item.id} style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)'
                }}>
                  <img src={item.mediaUrl} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.68rem', marginBottom: '0.4rem' }}>{item.category}</span>
                    <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)', fontWeight: 700 }}>R$ {item.priceEstimate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PhotographerDashboard;
