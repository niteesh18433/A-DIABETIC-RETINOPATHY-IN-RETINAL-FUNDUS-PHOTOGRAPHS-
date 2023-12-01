import React, { useState } from 'react';

const CreateLogForm = () => {
  const [formData, setFormData] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    metadata: {
      parentResourceId: ''
    }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'parentResourceId') {
      setFormData({
        ...formData,
        metadata: { [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/logs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create log');
      }

      const data = await response.json();
      if (data) {
        setFormData({
          level: '',
          message: '',
          resourceId: '',
          timestamp: '',
          traceId: '',
          spanId: '',
          commit: '',
          metadata: {
            parentResourceId: ''
          }
        });
      }
    } catch (error) {
      console.error('Error creating log:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="level" style={{ textAlign: 'left', marginRight: '121px' }}>
          Level:
        </label>
        <input
          type="text"
          id="level"
          name="level"
          required
          value={formData.level}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label htmlFor="message" style={{ textAlign: 'left', marginRight: '100px' }}>
          Message:
        </label>
        <input
          type="text"
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label htmlFor="resourceId" style={{ textAlign: 'left', marginRight: '80px' }}>
          Resource ID:
        </label>
        <input
          type="text"
          id="resourceId"
          name="resourceId"
          required
          value={formData.resourceId}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label htmlFor="timestamp" style={{ textAlign: 'left', marginRight: '90px' }}>
          Timestamp:
        </label>
        <input
          type="datetime-local"
          id="timestamp"
          name="timestamp"
          required
          value={formData.timestamp}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label htmlFor="traceId" style={{ textAlign: 'left', marginRight: '105px' }}>
          Trace ID:
        </label>
        <input
          type="text"
          id="traceId"
          name="traceId"
          required
          value={formData.traceId}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label htmlFor="spanId" style={{ textAlign: 'left', marginRight: '110px' }}>
          Span ID:
        </label>
        <input
          type="text"
          id="spanId"
          name="spanId"
          required
          value={formData.spanId}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label htmlFor="commit" style={{ textAlign: 'left', marginRight: '110px' }}>
          Commit:
        </label>
        <input
          type="text"
          id="commit"
          name="commit"
          required
          value={formData.commit}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <label
          htmlFor="parentResourceId"
          style={{ textAlign: 'left', marginRight: '40px' }}
        >
          Parent Resource ID:
        </label>
        <input
          type="text"
          id="parentResourceId"
          name="parentResourceId"
          required
          value={formData.metadata.parentResourceId}
          onChange={handleChange}
          style={{ width: '200px' }}
        />
        <br />
        <br />

        <input
          type="submit"
          value="Submit"
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </form>
    </div>
  );
};

export default CreateLogForm;