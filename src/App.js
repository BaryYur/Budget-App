import React, { useState } from 'react';

// import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal copy';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';

import BudgetCard from './components/BudgetCard';
import { useBudgets } from './contexts/BudgetContext';
import TotalBudgetCard from './components/TotalBudgetCard';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <React.Fragment>
      <Container className='my-4'>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1rem', 
            alignItems: 'flex-start' 
          }}
        >
          {
            budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);
              return (
                <BudgetCard 
                  key={budget.id} 
                  name={budget.name} 
                  gray 
                  amount={amount} 
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                />
                )
            })
          }
          <UncategorizedBudgetCard />
          <TotalBudgetCard />
          <BudgetCard name='Entertaimant' amount={200} max={1000}></BudgetCard>
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} />
    </React.Fragment>
  );
}

export default App;
