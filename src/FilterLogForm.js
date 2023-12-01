import React, { useState } from 'react';

const FilterLogForm = () => {
  const [logs, setLogs] = useState([]);
  const [filterWithTimestamp, setFilterWithTimestamp] = useState(false);

  const [filterWithTimestampData, setFilterWithTimestampData] = useState({
    from: '',
    to: ''
  });

  const [filterFormData, setFilterFormData] = useState({
    key: '',
    value: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFilterFormData({ ...filterFormData, [name]: value });
  };
  const handleTimestampFilterChange = e => {
    const { name, value } = e.target;
    setFilterWithTimestampData({ ...filterWithTimestampData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let queryParams = '';
      if (filterWithTimestamp) {
        const fromTimestamp = filterWithTimestampData.from;
        const toTimestamp = filterWithTimestampData.to;
        queryParams = `from=${fromTimestamp}&to=${toTimestamp}`;
      } else {
        queryParams = new URLSearchParams(filterFormData).toString();
      }
      const url = `http://localhost:3000/api/logs/getFilteredLogs?filterWithTimestamp=${filterWithTimestamp}&${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch filtered logs');
      }

      const data = await response.json();
      if (data) {
        setFilterFormData({
          key: '',
          value: ''
        });
        console.log('data: ', data);
        setLogs(data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="filterWithTimestamp"
          style={{ textAlign: 'left', marginRight: '120px' }}
        >
          Filter with timestamp?
        </label>
        <input
          type="checkbox"
          id="filterWithTimestamp"
          name="filterWithTimestamp"
          value={filterWithTimestamp}
          onChange={() => {
            setFilterWithTimestamp(!filterWithTimestamp);
          }}
        />
        <br />
        <br />
        {filterWithTimestamp ? (
          <>
            <label htmlFor="key" style={{ textAlign: 'left', marginRight: '120px' }}>
              From:
            </label>
            <input
              type="datetime-local"
              id="from"
              name="from"
              required
              value={filterWithTimestampData.from}
              onChange={handleTimestampFilterChange}
            />
            <br />
            <br />
            <label htmlFor="key" style={{ textAlign: 'left', marginRight: '140px' }}>
              To:
            </label>
            <input
              type="datetime-local"
              id="to"
              name="to"
              required
              value={filterWithTimestampData.to}
              onChange={handleTimestampFilterChange}
            />
            <br />
            <br />
          </>
        ) : (
          <>
            <label htmlFor="key" style={{ textAlign: 'left', marginRight: '120px' }}>
              Key:
            </label>
            <input
              type="text"
              id="key"
              name="key"
              required
              value={filterFormData.key}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="value" style={{ textAlign: 'left', marginRight: '110px' }}>
              Value:
            </label>
            <input
              type="text"
              id="value"
              name="value"
              required
              value={filterFormData.value}
              onChange={handleChange}
            />
            <br />
            <br />
          </>
        )}
        <input type="submit" value="Submit" />
      </form>
      {logs.length > 0 && (
        <div style={{ background: 'black', color: 'white' }}>
          <h2>Filtered Logs:</h2>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FilterLogForm;