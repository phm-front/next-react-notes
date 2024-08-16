export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      });
    }
  );

  return res;
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization:
        'bearer 13eb915e1fdd5f2b9e4b24a4f7f296bff3443632b91a027d77a2b9886a654b94203ea99509f16f3688f1c42b2c3fce7d150758112b374ff17e4a32e76c28af9511ad90a843b2bbe066c512bc3a30837f95656a5d66d918a4abc2ca7e61ed2351968afc9c14f25d8a2c16f7ef07c776e122f3a1bcd478633997150b73e18c58e7',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization:
        'bearer 13eb915e1fdd5f2b9e4b24a4f7f296bff3443632b91a027d77a2b9886a654b94203ea99509f16f3688f1c42b2c3fce7d150758112b374ff17e4a32e76c28af9511ad90a843b2bbe066c512bc3a30837f95656a5d66d918a4abc2ca7e61ed2351968afc9c14f25d8a2c16f7ef07c776e122f3a1bcd478633997150b73e18c58e7',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid) {
  const response = await fetch(
    `http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'bearer 13eb915e1fdd5f2b9e4b24a4f7f296bff3443632b91a027d77a2b9886a654b94203ea99509f16f3688f1c42b2c3fce7d150758112b374ff17e4a32e76c28af9511ad90a843b2bbe066c512bc3a30837f95656a5d66d918a4abc2ca7e61ed2351968afc9c14f25d8a2c16f7ef07c776e122f3a1bcd478633997150b73e18c58e7',
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
}
